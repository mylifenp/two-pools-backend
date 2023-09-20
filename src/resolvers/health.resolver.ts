import {
  MutationHealthArgs,
  ResolversParentTypes,
} from "@generated/resolvers-types.js";

export default {
  Query: {
    health: () => ({ status: "ok" }),
  },
  Mutation: {
    health: (parent: ResolversParentTypes, { status }: MutationHealthArgs) => ({
      status,
    }),
  },
};
