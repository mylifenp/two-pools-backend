import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { type Express } from "express";
import http from "http";
import resolvers from "./resolvers/index.js";
import typeDefs from "./schema/index.js";
import config from "./config.js";
import { Context } from "@helpers/interfaces.js";
import { connectDb } from "./db.js";

const shutdown = function () {
  // clean up your resources and exit
  console.log("cleaning up before shutdown");
  process.exit();
};

export async function startServer(app: Express) {
  const httpServer = http.createServer(app);
  const db = await connectDb();

  if (!db) {
    console.log("connection could not be established");
    shutdown();
  }

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

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
    formatError: (err) => {
      const message = err.message.replace("Validation error: ", "");
      return { ...err, message };
    },
  });

  // await server.start();

  return { server, httpServer, db };
}
