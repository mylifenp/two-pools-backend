import {
  MutationAddCategoryArgs,
  MutationDeleteCategoryArgs,
  MutationUpdateCategoryArgs,
  QueryCategoryArgs,
  QuerySuggestCategoriesArgs,
  ResolversParentTypes,
} from "../generated/resolvers-types.js";
import { Context } from "../helpers/interfaces.js";
import { type Category } from "@models/category.model.js";
import { setJSON, getJSON } from "./controller.miscl.js";
import { GraphQLError } from "graphql";
import pubsub from "../pubsub.js";
import { EVENTS } from "../subscriptions/index.js";

export default {
  Query: {
    categories: async (
      parent: ResolversParentTypes,
      args: QuerySuggestCategoriesArgs,
      { models, redisClient }: Context
    ) => {
      const categories_keys = await redisClient.keys("categories:*");
      if (!categories_keys.length) {
        const categories = await models.Category.find<Category>();
        for (let category of categories) {
          await setJSON(`categories:${category.id}`, category);
        }
        return categories;
      }
      const cached_categories = [];
      for (let key of categories_keys) {
        const category = await getJSON(key);
        if (!category) continue;
        cached_categories.push(category);
      }
      return cached_categories;
    },
    category: async (
      parent: ResolversParentTypes,
      { id }: QueryCategoryArgs,
      { models }: Context
    ) => {
      const category = await getJSON(`categories:${id}`);
      if (!category) {
        const category = await models.Category.findById<Category>(id);
        if (!category) {
          throw new GraphQLError("Category not found");
        }
        await setJSON(`categories:${id}`, category);
        return category;
      }
      return category;
    },
    suggestCategories: async (
      parent: ResolversParentTypes,
      { ids }: QuerySuggestCategoriesArgs,
      { models }: Context
    ) => {
      return await models.Category.find<Category>();
    },
  },
  Mutation: {
    addCategory: async (
      parent: ResolversParentTypes,
      { name }: MutationAddCategoryArgs,
      { models }: Context
    ) => {
      try {
        const category = (await models.Category.create({ name })) as Category;
        await setJSON(`categories:${category.id}`, category);
        pubsub.publish(EVENTS.CATEGORY.CATEGORY_ADDED, {
          categoryAdded: category,
        });
        return category;
      } catch (err) {
        throw new GraphQLError("Could not add a new category");
      }
    },
    updateCategory: async (
      parent: ResolversParentTypes,
      { id, name }: MutationUpdateCategoryArgs,
      context: Context
    ) => {
      const category =
        await context.models.Category.findByIdAndUpdate<Category>(
          { _id: id },
          { name },
          { new: true }
        );
      if (!category) {
        throw new GraphQLError("Category not found");
      }
      await setJSON(`categories:${id}`, category);
      pubsub.publish(EVENTS.CATEGORY.CATEGORY_UPDATED, {
        categoryUpdated: category,
      });
      return category;
    },
    deleteCategory: async (
      parent: ResolversParentTypes,
      { id }: MutationDeleteCategoryArgs,
      { models, redisClient }: Context
    ) => {
      try {
        const category = await models.Category.findByIdAndDelete<Category>(id);
        if (!category) {
          throw new GraphQLError("Category not found");
        }
        await redisClient.del(`categories:${id}`);
        pubsub.publish(EVENTS.CATEGORY.CATEGORY_DELETED, {
          categoryDeleted: category,
        });
        return category;
      } catch (err) {
        throw new GraphQLError("Could not delete category");
      }
    },
  },
  Subscription: {
    categoryAdded: {
      subscribe: () => pubsub.asyncIterator(EVENTS.CATEGORY.CATEGORY_ADDED),
    },
    categoryUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.CATEGORY.CATEGORY_UPDATED),
    },
    categoryDeleted: {
      subscribe: () => pubsub.asyncIterator(EVENTS.CATEGORY.CATEGORY_DELETED),
    },
  },
};
