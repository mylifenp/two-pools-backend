import { ResolversParentTypes } from "@generated/resolvers-types.js";
import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { Context } from "@helpers/interfaces.js";
import { isAuthenticated } from "../lib/authentication.js";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    userInfo: async (
      parent: ResolversParentTypes,
      args: any,
      { models, me }: Context
    ) => {
      if (!me) {
        throw new GraphQLError("Not authenticated");
      }
      const filter = { email: me.email };
      const { org_roles } = me;
      const org_roles_changed =
        org_roles &&
        Object.keys(org_roles).map((key) => ({
          org_id: key,
          ...org_roles[key],
        }));
      return await models.User.findOneAndUpdate(
        filter,
        { ...me, org_roles: org_roles_changed },
        {
          new: true,
          upsert: true,
        }
      );
    },
  },
};

const resolverComposer = {
  "Query.userInfo": [isAuthenticated()],
};

export default composeResolvers(resolvers, resolverComposer);
