// import Redis from "ioredis";
import { default as Redis, RedisOptions } from "ioredis";
import config from "./config.js";

const options: RedisOptions = {
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
  enableReadyCheck: true,
};

const redisClient = new Redis.default(options);

const dropRedis = async () => await redisClient.flushall();

if (redisClient.status === "close") {
  redisClient.connect();
}

export { redisClient, dropRedis };
