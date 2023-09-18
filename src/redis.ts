import Redis from "ioredis";
import config from "./config.js";

const options = {
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
  namespace: "CACHE",
};

const redisClient = new Redis(options);

export default redisClient;
