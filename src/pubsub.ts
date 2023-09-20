import { default as Redis } from "ioredis";
import { RedisOptions } from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import config from "./config.js";
import { PubSubRedisOptions } from "graphql-redis-subscriptions/dist/redis-pubsub.js";

const options: RedisOptions = {
  host: config.REDIS_PUBSUB_HOST,
  port: Number(config.REDIS_PUBSUB_PORT),
  enableReadyCheck: true,
  retryStrategy: (times) => Math.min(times * 50, 2000),
};

const dataReviver = (key: any, value: any) => {
  const isISO8601Z =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
  if (typeof value === "string" && isISO8601Z.test(value)) {
    const tempDateNumber = Date.parse(value);
    if (!isNaN(tempDateNumber)) {
      return new Date(tempDateNumber);
    }
  }
  return value;
};

const pubsub_options: PubSubRedisOptions = {
  connection: options,
  publisher: new Redis.default(options),
  subscriber: new Redis.default(options),
  reviver: dataReviver,
};

// const pubsub = new RedisPubSub({
//   publisher: new Redis.default(options),
//   subscriber: new Redis.default(options),
//   reviver: dataReviver,
// });

const pubsub = new RedisPubSub(pubsub_options);

export const closeInstance = () => pubsub.close();

export default pubsub;
