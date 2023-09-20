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
import { Health } from "../src/generated/resolvers-types";
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

describe("Check health of Graphql service", () => {
  it("query should return status as ok", async () => {
    const HEALTH = `#graphql
      query health {
        health {
          status
        }
      }
    `;
    const response = await server.executeOperation<Record<string, Health>>({
      query: HEALTH,
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.health.status).toBe("ok");
    expect(response.body.singleResult.data?.health).toEqual({ status: "ok" });
  });

  it('mutation should return status as "tested', async () => {
    const HEALTH = `#graphql
      mutation Health($status: String!) {
        health(status: $status) {
          status
        }
      }
    `;
    const response = await server.executeOperation<Record<string, Health>>({
      query: HEALTH,
      variables: { status: "tested" },
    });

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.health.status).toBe("tested");
  });

  it("check if db is working", async () => {
    const DB_HEALTH = `#graphql
      query DBHealth {
        DBHealth {
          status
        }
      }
    `;
    const response = await server.executeOperation<Record<string, Health>>(
      {
        query: DB_HEALTH,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.DBHealth.status).toBe("ok");
  });

  it("check if redis is working", async () => {
    const REDIS_HEALTH = `#graphql
      query RedisHealth {
        RedisHealth {
          status
          moreInfo
        }
      }
    `;
    const response = await server.executeOperation<Record<string, Health>>(
      {
        query: REDIS_HEALTH,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.RedisHealth.status).toBe("ok");
  });
});

// describe("Check health of the graphql", () => {
//   const skill = {
//     name: "Test Skill",
//   };
//   // add a skill to DB;
//   const publishedSkill = new Skill(skill);
//   it("should return ", async () => {
//     const db_skill = await publishedSkill.save();

//     const SKILLS = `#graphql
//       query skills {
//         skills {
//           id
//           name
//         }
//     }`;
//     const response = await server.executeOperation({
//       query: SKILLS,
//       operationName: "skills",
//     });

//     assert(response.body.kind === "single");
//     console.log("response", response.body.singleResult.errors);
//     // console.log("response", response.body.singleResult.errors);
//     // expect(response.body.singleResult.errors).toBeUndefined();
//     // expect(response.body.singleResult.data?.skill).toBe(skill);
//   });
// });
