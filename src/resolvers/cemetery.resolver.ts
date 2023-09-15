import {
  Cemetery,
  MutationAddCemeteryArgs,
  QueryCemeteryArgs,
  ResolversParentTypes,
} from "@generated/resolvers-types.js";
// import pubsub from "../pubsub.js";
// import { withFilter } from "graphql-subscriptions";
import redisClient from "../redis.js";
import { Context } from "@helpers/interfaces.js";

export default {
  Query: {
    cemetery: async (
      parent: ResolversParentTypes,
      { id }: QueryCemeteryArgs,
      { models }: Context
    ) => {
      let cemetery = await redisClient.get(`cemetery:${id}`);
      if (cemetery) {
        return JSON.parse(cemetery);
      } else {
        cemetery = await models.Cemetery.findById(id);
        redisClient.set(`cemetery:${id}`, JSON.stringify(cemetery));
        return cemetery;
      }
    },
  },
  Mutation: {
    addCemetery: async (
      parent: ResolversParentTypes,
      { input }: MutationAddCemeteryArgs,
      { models }: Context
    ) => {
      const cemetery = await models.Cemetery.create(input);
      redisClient.set(`cemetery:${cemetery.id}`, JSON.stringify(cemetery));
      return cemetery;
    },
  },
  // Subscription: {},
  Cemetery: {
    trustee: async (cemetery: Cemetery, args: any, { models }: Context) => {
      return await models.Trustee.findById(cemetery.trustee);
    },
  },
};
