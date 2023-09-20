import {
  MutationAddSkillArgs,
  MutationDeleteSkillArgs,
  MutationUpdateSkillArgs,
  QuerySkillArgs,
  QuerySuggestSkillsArgs,
  ResolversParentTypes,
} from "../generated/resolvers-types.js";
import { Context } from "../helpers/interfaces.js";
import { type Skill } from "@models/skill.model.js";
import redisClient from "../redis.js";
import { GraphQLError } from "graphql";
import { getJSON, setJSON } from "./controller.miscl.js";

export default {
  Query: {
    skills: async (
      parent: ResolversParentTypes,
      args: any,
      { models, redisClient }: Context
    ) => {
      const skills_keys = await redisClient.keys("skills:*");
      if (!skills_keys.length) {
        const skills = await models.Skill.find<Skill>();
        for (let skill of skills) {
          await setJSON(`skills:${skill.id}`, skill);
        }
        return skills;
      }
      const cached_skills = [];
      for (let key of skills_keys) {
        const skill = await getJSON(key);
        if (!skill) continue;
        cached_skills.push(skill);
      }
      return cached_skills;
    },
    skill: async (
      parent: ResolversParentTypes,
      { id }: QuerySkillArgs,
      { models }: Context
    ) => {
      const skill = await getJSON(`skills:${id}`);
      if (!skill) {
        const skill = await models.Skill.findById<Skill>(id);
        if (!skill) {
          throw new GraphQLError("Skill not found");
        }
        await setJSON(`skills:${id}`, skill);
        return skill;
      }
      return skill;
    },
    suggestSkills: async (
      parent: ResolversParentTypes,
      { ids }: QuerySuggestSkillsArgs,
      { models }: Context
    ) => {
      return await models.Skill.find<Skill>();
    },
  },
  Mutation: {
    addSkill: async (
      parent: ResolversParentTypes,
      { name }: MutationAddSkillArgs,
      { models }: Context
    ) => {
      try {
        const skill = (await models.Skill.create({ name })) as Skill;
        await setJSON(`skills:${skill.id}`, skill);
        return skill;
      } catch (err) {
        throw new GraphQLError("Could not add a new skill");
      }
    },
    updateSkill: async (
      parent: ResolversParentTypes,
      { id, name }: MutationUpdateSkillArgs,
      { models }: Context
    ) => {
      const skill = await models.Skill.findByIdAndUpdate<Skill>(
        { _id: id },
        { name },
        { new: true }
      );
      if (!skill) {
        throw new GraphQLError("Skill not found");
      }
      await setJSON(`skills:${skill.id}`, skill);
      return skill;
    },
    deleteSkill: async (
      parent: ResolversParentTypes,
      { id }: MutationDeleteSkillArgs,
      { models }: Context
    ) => {
      try {
        const skill = await models.Skill.findByIdAndDelete<Skill>(id);
        if (!skill) {
          throw new GraphQLError("Skill not found");
        }
        await redisClient.del(`skills:${skill.id}`);
        return skill;
      } catch (err) {
        throw new GraphQLError("Skill not found");
      }
    },
  },
};
