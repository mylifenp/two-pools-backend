import {
  MutationAddEmailSubscriptionArgs,
  MutationDeleteEmailSubscriptionArgs,
  QueryIsEmailSubscribedArgs,
  ResolversParentTypes,
} from "@generated/resolvers-types.js";
import { Context } from "@helpers/interfaces.js";
import { GraphQLError } from "graphql";

export default {
  Query: {
    isEmailSubscribed: async (
      parent: ResolversParentTypes,
      { input }: QueryIsEmailSubscribedArgs,
      { models }: Context
    ) => {
      const filter = { email: input.email };
      const emailSubscription = await models.EmailSubscription.findOne(filter);

      if (!emailSubscription) {
        throw new GraphQLError("Email Subscription not found");
      }
      return { status: true, message: "Email Subscription found" };
    },
  },
  Mutation: {
    addEmailSubscription: async (
      parent: ResolversParentTypes,
      { input }: MutationAddEmailSubscriptionArgs,
      { models }: Context
    ) => {
      const filter = { email: input.email };
      const emailSubscription = await models.EmailSubscription.findOneAndUpdate(
        filter,
        { active: true },
        { upsert: true }
      );
      if (!emailSubscription) {
        throw new GraphQLError("Email Subscription not found");
      }
      return { status: true, message: "Email Subscription created" };
    },
    deleteEmailSubscription: async (
      parent: ResolversParentTypes,
      { input }: MutationDeleteEmailSubscriptionArgs,
      { models }: Context
    ) => {
      const filter = { email: input.email };
      const emailSubscription = await models.EmailSubscription.findOneAndRemove(
        filter
      );
      if (!emailSubscription) {
        throw new GraphQLError("Email Subscription not found");
      }
      // await emailSubscription.destroy();
      return { status: true, message: "Email Subscription deleted" };
    },
  },
};
