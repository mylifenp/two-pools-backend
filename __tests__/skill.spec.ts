import { ApolloServer } from "@apollo/server";
import { dropDb, dropCollections, connectDb } from "../src/db";
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
import { dropRedis, redisClient } from "../src/redis";
import { Skill } from "../src/generated/resolvers-types";
import { Context } from "../src/helpers/interfaces";
import { Mongoose } from "mongoose";
import models from "../src/models/index.js";
import pubsub from "../src/pubsub.js";

let server: ApolloServer<Context>;
let db: Mongoose;

beforeAll(async () => {
  server = await testServer();
  db = await connectDb();
});

afterAll(async () => {
  await dropDb();
  await dropRedis();
});

afterEach(async () => {
  await dropCollections();
});

const skill_name = "A test Skill12";

const SKILLS = `#graphql
  query skills {
    skills {
      id
      name
    }
  }
`;
const SKILL = `#graphql
  query skillWithId($skillId: ID!) {
    skill(id: $skillId) {
      id
      name
      createdAt
    }
  }
`;

describe("Check skills controllers", () => {
  it("query should return no skills as none exists", async () => {
    const response = await server.executeOperation<Record<string, Skill>>(
      {
        query: SKILLS,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.skills).toEqual([]);
  });
  it("should add a new skill", async () => {
    const ADD_SKILL = `#graphql
      mutation addSkill($name: String!) {
        addSkill(name: $name) {
          id
          name
        }
      }
    `;
    const response = await server.executeOperation<Record<string, Skill>>(
      { query: ADD_SKILL, variables: { name: skill_name } },
      {
        contextValue: {
          db,
          pubsub,
          redisClient,
          models,
        },
      }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.addSkill.name).toEqual(skill_name);
    expect(response.body.singleResult.data?.addSkill.id).toBeDefined();
  });
  it("should not show the skills added to database, as the cache will not hydrated", async () => {
    await db.models.Skill.create({ name: "A new test Skill" });

    const SKILLS = `#graphql
      query skills {
        skills {
          id
          name
        }
      }
    `;
    const response = await server.executeOperation<Record<string, Skill>>(
      {
        query: SKILLS,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.skills).toHaveLength(1);
  });
  it("should get one skill when queried by id", async () => {
    const filter = { name: skill_name };
    const skill = await db.models.Skill.create(filter);
    const response_skill = await server.executeOperation<Record<string, Skill>>(
      {
        query: SKILL,
        variables: {
          skillId: skill.id,
        },
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );
    assert(response_skill.body.kind === "single");
    expect(response_skill.body.singleResult.errors).toBeUndefined();
    expect(response_skill.body.singleResult.data?.skill.id).toEqual(skill.id);
  });
});
