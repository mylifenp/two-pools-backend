import { default as Redis } from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import config from "./config.js";

const options = {
  host: config.REDIS_HOST,
  port: Number(config.REDIS_PORT),
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
  namespace: "PUBSUB",
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

const pubsub = new RedisPubSub({
  publisher: new Redis.default(options),
  subscriber: new Redis.default(options),
  reviver: dataReviver,
});

export const closeInstance = () => pubsub.close();

export default pubsub;
