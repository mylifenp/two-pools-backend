import express from "express";
import { startServer } from "../src/server.js";
import { expressMiddleware } from "@apollo/server/express4";
import parser from "body-parser";
import redisClient from "../src/redis.js";
import models from "../src/models/index.js";
import authenticateToken from "../src/lib/authentication.js";
import pubsub from "../src/pubsub.js";
import { ApolloServer } from "@apollo/server";
import { Context } from "../src/helpers/interfaces.js";

export const testServer = async (): Promise<ApolloServer<Context>> => {
  const app = express();
  const { server, db } = await startServer(app);
  await server.start();
  app.use(
    "/graphql",
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
  // await new Promise<void>((resolve) =>
  //   httpServer.listen({ port: PORT }, resolve)
  // );
  // console.log(`🚀 Server ready at ${BACKEND_URL}:${PORT}/graphql`);

  return server;
};
