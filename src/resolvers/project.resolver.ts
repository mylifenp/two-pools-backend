import {
  MutationAddProjectArgs,
  MutationDeleteProjectArgs,
  MutationUpdateProjectArgs,
  Project,
  QueryProjectArgs,
  ResolversParentTypes,
  SubscriptionProjectDeletedArgs,
  SubscriptionProjectUpdatedArgs,
} from "@generated/resolvers-types.js";
import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { Context } from "@helpers/interfaces.js";
import { getJSON, setJSON } from "./controller.miscl.js";
import { GraphQLError } from "graphql";
import pubsub from "../pubsub.js";
import { EVENTS } from "../subscriptions/index.js";
import { withFilter } from "graphql-subscriptions";
import { isAuthenticated } from "../lib/authentication.js";

const resolvers = {
  Query: {
    projects: async (
      parent: ResolversParentTypes,
      args: any,
      { models, redisClient }: Context
    ) => {
      const project_keys = await redisClient.keys("projects:*");
      if (!project_keys.length) {
        const projects = await models.Project.find();
        for (let project of projects) {
          await setJSON(`projects:${project.id}`, project);
        }
        return projects;
      }
      const cached_projects = [];
      for (let key of project_keys) {
        const project = await getJSON(key);
        if (!project) continue;
        cached_projects.push(project);
      }
      return cached_projects;
    },
    project: async (
      parent: ResolversParentTypes,
      { id }: QueryProjectArgs,
      { models }: Context
    ) => {
      const project = await getJSON(`projects:${id}`);
      if (!project) {
        const project = await models.Project.findById(id);
        if (!project) {
          throw new GraphQLError("Project not found");
        }
        await setJSON(`projects:${id}`, project);
        return project;
      }
      return project;
    },
  },
  Mutation: {
    addProject: async (
      parent: ResolversParentTypes,
      { input }: MutationAddProjectArgs,
      { models }: Context
    ) => {
      try {
        const project = (await models.Project.create(input)) as Project;
        await setJSON(`projects:${project.id}`, project);
        pubsub.publish(EVENTS.PROJECT.PROJECT_ADDED, { projectAdded: project });
        return project;
      } catch (err) {
        throw new GraphQLError("Could not add project");
      }
    },
    updateProject: async (
      parent: ResolversParentTypes,
      { id, input }: MutationUpdateProjectArgs,
      { models }: Context
    ) => {
      const project = await models.Project.findByIdAndUpdate<Project>(
        { _id: id },
        { $set: { ...input } },
        { new: true }
      );
      if (!project) {
        throw new GraphQLError("Project could not be updated");
      }
      await setJSON(`projects:${project.id}`, project);
      pubsub.publish(`${EVENTS.PROJECT.PROJECT_UPDATED}.${id}`, {
        projectUpdated: project,
      });
      return project;
    },
    deleteProject: async (
      parent: ResolversParentTypes,
      { id }: MutationDeleteProjectArgs,
      { models, redisClient }: Context
    ) => {
      try {
        const project = await models.Project.findByIdAndDelete(id);
        if (!project) {
          throw new GraphQLError("Project not found");
        }
        await redisClient.del(`projects:${id}`);
        pubsub.publish(`${EVENTS.PROJECT.PROJECT_DELETED}.${id}`, {
          projectDeleted: project,
        });
        return project;
      } catch (err) {
        throw new GraphQLError("Could not delete project");
      }
    },
  },
  Subscription: {
    projectAdded: {
      subscribe: () => pubsub.asyncIterator(EVENTS.PROJECT.PROJECT_ADDED),
    },
    projectUpdated: {
      subscribe: withFilter(
        (_, { id }: SubscriptionProjectUpdatedArgs) =>
          pubsub.asyncIterator(`${EVENTS.PROJECT.PROJECT_UPDATED}.${id}`),
        (payload, variables) => {
          return payload.projectUpdated.id === variables.id;
        }
      ),
    },
    projectDeleted: {
      subscribe: withFilter(
        (_, { id }: SubscriptionProjectDeletedArgs) =>
          pubsub.asyncIterator(`${EVENTS.PROJECT.PROJECT_DELETED}.${id}`),
        (payload, variables) => {
          return payload.projectDeleted.id === variables.id;
        }
      ),
    },
  },
};

const resolverComposition = {
  "Mutation.addProject": [isAuthenticated()],
};

export default composeResolvers(resolvers, resolverComposition);
