import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import parser from "body-parser";
import config from "./config.js";
import redisClient from "./redis.js";
import models from "./models/index.js";
import authenticateToken from "./lib/authentication.js";
import pubsub from "./pubsub.js";
import { startServer } from "./server.js";

const { PORT, BACKEND_URL } = config;

const shutdown = function () {
  // clean up your resources and exit
  console.log("cleaning up before shutdown");
  process.exit();
};

async function main() {
  const app = express();
  const { server, httpServer, db } = await startServer(app);

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
  console.log(`🚀 Server ready at ${BACKEND_URL}:${PORT}/graphql`);

  process.on("unhandledRejection", async (error) => {
    console.log(`Logged Error: ${error}`);
    httpServer.close(() => process.exit(1));
    pubsub.close();
  });

  process.on("SIGINT", function onSigint() {
    console.log("terminating the service onSigint");
    shutdown();
  });

  process.on("SIGTERM", function onSigterm() {
    console.log("terminating the service onSigterm");
    shutdown();
  });
}

await main();
