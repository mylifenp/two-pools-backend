import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { unwrapResolverError } from "@apollo/server/errors";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { type Express } from "express";
import http from "http";
import resolvers from "./resolvers/index.js";
import typeDefs from "./schema/index.js";
import config from "./config.js";
import { Context } from "@helpers/interfaces.js";
import { isTokenValid } from "./lib/authentication.js";
import { CloseCode } from "graphql-ws";

export async function startServer(app: Express) {
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });
  const serverCleanup = useServer(
    {
      schema,
      onConnect: async (ctx) => {
        console.warn("ctx.connectionParams", ctx.connectionParams);
        return isTokenValid(ctx.connectionParams);
      },
      onSubscribe: async (ctx) => {
        if (!isTokenValid(ctx.connectionParams)) {
          return ctx.extra.socket.close(
            CloseCode.Forbidden,
            "Forbidden: User could not be authenticated"
          );
        }
      },
      onDisconnect: async (ctx, code, reason) => {
        console.log("Disconnected!", reason);
      },
    },
    wsServer
  );

  const basicPlugins = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ];

  const developmentPlugins =
    config.ENV === "development"
      ? []
      : [ApolloServerPluginLandingPageDisabled()];

  const server = new ApolloServer<Context>({
    schema,
    status400ForVariableCoercionErrors: true,
    plugins: [...basicPlugins, ...developmentPlugins],
    csrfPrevention: true,
    formatError: (formattedError, error) => {
      const message = formattedError.message;
      if (message.startsWith("Database Error: ")) {
        return { message: "Internal server error" };
      }
      if (message.startsWith("Validation error: ")) {
        return { message: "Internal server error" };
      }
      if (message.startsWith("Error: Invalid token")) {
        return { message: "Internal server error" };
      }
      if (unwrapResolverError(error) instanceof Error) {
        console.log("error", unwrapResolverError(error));
        return { message: "Internal server error" };
      }
      return formattedError;
    },
  });

  // await server.start();

  return { server, httpServer };
}
