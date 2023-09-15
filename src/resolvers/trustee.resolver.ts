import {
  MutationAddTrusteeArgs,
  MutationUpdateTrusteeArgs,
  QueryTrusteeArgs,
  ResolversParentTypes,
  Trustee,
} from "@generated/resolvers-types.js";
import pubsub from "../pubsub.js";
import { withFilter } from "graphql-subscriptions";
import { Context } from "@helpers/interfaces.js";
import { EVENTS } from "../subscriptions/index.js";

export default {
  Query: {
    test: async (parent: ResolversParentTypes, args: any, { me }: Context) => {
      return me;
    },
    trustee: async (
      parent: ResolversParentTypes,
      { id }: QueryTrusteeArgs,
      { models, redisClient }: Context
    ) => {
      let trustee = await redisClient.get(`trustee:${id}`);
      if (trustee) {
        return JSON.parse(trustee);
      } else {
        trustee = await models.Trustee.findById(id);
        redisClient.set(`trustee:${id}`, JSON.stringify(trustee));
        return trustee;
      }
    },
  },
  Mutation: {
    addTrustee: async (
      parent: ResolversParentTypes,
      { input }: MutationAddTrusteeArgs,
      { models, redisClient }: Context
    ) => {
      const trustee = await models.Trustee.create(input);
      console.log("adding trustee", trustee);
      redisClient.set(`trustee:${trustee.id}`, JSON.stringify(trustee));
      return trustee;
    },
    updateTrustee: async (
      parent: ResolversParentTypes,
      { id, input }: MutationUpdateTrusteeArgs,
      { models, redisClient, pubsub }: Context
    ) => {
      const trustee = await models.Trustee.findOneAndUpdate(
        { _id: id },
        { ...input },
        { new: true }
      );
      pubsub.publish(EVENTS.TRUSTEE.TRUSTEE_UPDATED, {
        trusteeUpdated: {
          id: trustee.id,
          event: EVENTS.TRUSTEE.TRUSTEE_UPDATED,
          trustee,
        },
      });
      redisClient.set(`trustee:${trustee.id}`, JSON.stringify(trustee));
      return trustee;
    },
  },
  Subscription: {
    trusteeUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(EVENTS.TRUSTEE.TRUSTEE_UPDATED),
        (payload, variables) => {
          return true;
        }
      ),
    },
  },
  Trustee: {
    cemeteries: async (trustee: Trustee, args: any, { models }: Context) => {
      const { cemeteries } = trustee;
      return await models.Cemetery.find({ _id: { $in: cemeteries } });
    },
  },
};
