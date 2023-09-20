import express from "express";
import { startServer } from "../src/server.js";

export const testServer = async () => {
  const app = express();
  const { server } = await startServer(app);
  await server.start();

  return server;
};
