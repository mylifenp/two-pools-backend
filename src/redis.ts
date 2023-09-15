import Redis from "ioredis";
import config from "./config.js";

const options = {
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  namespace: "CACHE",
};

const redisClient = new Redis(options);

export default redisClient;
