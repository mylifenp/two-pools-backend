import {
  MutationHealthArgs,
  ResolversParentTypes,
} from "@generated/resolvers-types.js";
import { Context } from "@helpers/interfaces.js";
import pubsub from "../pubsub.js";
import { EVENTS } from "../subscriptions/index.js";
import { withFilter } from "graphql-subscriptions";

export default {
  Query: {
    health: () => {
      pubsub.publish(EVENTS.HEALTH.HEALTH_CALLED, {
        health: { status: "ok", moreInfo: "Health called by someone" },
      });
      return { status: "ok" };
    },
    DBHealth: (parent: ResolversParentTypes, args: any, { db }: Context) => {
      return {
        status: db.connection.readyState === 1 ? "ok" : "error",
        moreInfo: `${db.connection.host}:${db.connection.port}/${db.connection.name}`,
      };
    },
    RedisHealth: (
      parent: ResolversParentTypes,
      args: any,
      { redisClient }: Context
    ) => {
      return {
        status: redisClient.status === "ready" ? "ok" : "error",
        moreInfo: `${redisClient.options.host}:${redisClient.options.port}`,
      };
    },
  },
  Mutation: {
    health: (parent: ResolversParentTypes, { status }: MutationHealthArgs) => ({
      status,
    }),
  },
  Subscription: {
    health: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(EVENTS.HEALTH.HEALTH_CALLED),
        (payload, variables) => {
          console.log("payload", payload, "variables", variables);
          return true;
        }
      ),
    },
  },
};
