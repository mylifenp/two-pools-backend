import {
  MutationAddSkillArgs,
  MutationUpdateSkillArgs,
  QuerySkillArgs,
  ResolversParentTypes,
} from "@generated/resolvers-types";
import { Context } from "@helpers/interfaces";
import { type Skill } from "@models/skill.model.js";
import redisClient from "../redis.js";
import { get } from "http";
import { GraphQLError } from "graphql";

const setJSON = async (path: string, skill: Skill) =>
  await redisClient.call("JSON.SET", path, "$", JSON.stringify(skill));

const getJSON = async (path: string): Promise<Skill> => {
  try {
    const data = (await redisClient.call("JSON.GET", path, "$")) as string;
    const [skill] = JSON.parse(data);
    return skill;
  } catch (err) {
    throw err;
  }
};

export default {
  Query: {
    skills: async (
      parent: ResolversParentTypes,
      args: any,
      { models, redisClient }: Context
    ) => {
      const skills_keys = await redisClient.keys("skills:*");
      if (!skills_keys.length) {
        const skills = await models.Skill.find();
        for (let skill of skills) {
          await setJSON(`skills:${skill._id}`, skill);
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
      const skill = getJSON(`skills:${id}`);
      if (!skill) {
        const skill = await models.Skill.findById(id);
        if (!skill) {
          throw new GraphQLError("Skill not found");
        }
        await setJSON(`skills:${id}`, skill);
        return skill;
      }
      return skill;
    },
  },
  Mutation: {
    addSkill: async (
      parent: ResolversParentTypes,
      { name }: MutationAddSkillArgs,
      { models }: Context
    ) => {
      const skill = await models.Skill.create({ name });
      await setJSON(`skills:${skill._id}`, skill);
      return skill;
    },
    updateSkill: async (
      parent: ResolversParentTypes,
      { id, name }: MutationUpdateSkillArgs,
      { models }: Context
    ) => {
      const skill = await models.Skill.findByIdAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );
      await setJSON(`skills:${skill._id}`, skill);
      return skill;
    },
  },
};
