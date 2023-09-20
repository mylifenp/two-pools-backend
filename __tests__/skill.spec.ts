import { ApolloServer } from "@apollo/server";
import { dropDb, dropCollections } from "../src/db";
import Skill from "../src/models/skill.model";
import { testServer } from "./test-server";
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  afterEach,
} from "@jest/globals";
import assert from "assert";
import { Context } from "../src/helpers/interfaces";
import { dropRedis } from "../src/redis";

let server: ApolloServer<Context>;

beforeAll(async () => {
  server = await testServer();
});

afterAll(async () => {
  await dropDb();
  await dropRedis();
});

afterEach(async () => {
  await dropCollections();
});

describe("Test the Skill resolver, schema and model", () => {
  const skill = {
    name: "Test Skill",
  };
  // add a skill to DB;
  const publishedSkill = new Skill(skill);
  it("should return ", async () => {
    const db_skill = await publishedSkill.save();

    const SKILLS = `#graphql
      query skills {
        skills {
          id
          name
        }
    }`;
    const response = await server.executeOperation({
      query: SKILLS,
      operationName: "skills",
    });

    assert(response.body.kind === "single");
    console.log("response", response.body.singleResult.errors);
    // console.log("response", response.body.singleResult.errors);
    // expect(response.body.singleResult.errors).toBeUndefined();
    // expect(response.body.singleResult.data?.skill).toBe(skill);
  });
});
