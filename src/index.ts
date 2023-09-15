import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import http from "http";
import cors from "cors";
import parser from "body-parser";
import resolvers from "./resolvers/index.js";
import typeDefs from "./schema/index.js";
import config from "./config.js";
import { Context } from "@helpers/interfaces.js";
import { connectDb } from "./db.js";
import pubsub from "./pubsub.js";
import redisClient from "./redis.js";
import models from "./models/index.js";
import authenticateToken from "./lib/authentication.js";

const { PORT } = config;

const shutdown = function () {
  // clean up your resources and exit
  console.log("cleaning up before shutdown");
  process.exit();
};

const app = express();
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
  config.ENV === "development" ? [] : [ApolloServerPluginLandingPageDisabled()];

const server = new ApolloServer<Context>({
  schema,
  status400ForVariableCoercionErrors: true,
  plugins: [...basicPlugins, ...developmentPlugins],
});

await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  parser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({
      req,
      res,
      db,
      pubsub,
      redisClient,
      models,
      me: authenticateToken(req),
    }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);

process.on("SIGINT", function onSigint() {
  console.log("terminating the service onSigint");
  shutdown();
});

process.on("SIGTERM", function onSigterm() {
  console.log("terminating the service onSigterm");
  shutdown();
});
