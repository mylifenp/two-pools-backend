import { ApolloServer } from "@apollo/server";
import { Context } from "../src/helpers/interfaces";
import { Mongoose } from "mongoose";
import { testServer } from "./test-server";
import { connectDb, dropCollections, dropDb } from "../src/db";
import { dropRedis, redisClient } from "../src/redis";
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  afterEach,
} from "@jest/globals";
import {
  EstimationUnit,
  ExperienceLevel,
  Project,
  ProjectInput,
} from "../src/generated/resolvers-types";
import models from "../src/models";
import { Category } from "../src/models/category.model";
import { Skill } from "../src/models/skill.model";
import pubsub from "../src/pubsub";
import assert from "assert";

let server: ApolloServer<Context>;
let db: Mongoose;
// let category1: Category;
// let category2: Category;
// let skill1: Skill;
// let skill2: Skill;

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

const new_project: ProjectInput = {
  title: "A test project",
  location: "Lagos",
  estimation: {
    unit: EstimationUnit.HoursPerMonth,
    value: 100,
  },
  // categories: [],
  experience_level: ExperienceLevel.EntryLevel,
  // required_skills: [],
  description: "A test project description",
};

const PROJECTS = `#graphql
  query projects {
    projects {
      id
      title
      location
      estimation {
        unit
        value
      }
      description
      categories {
        id
        name
      }
      experience_level
      required_skills {
        id
        name
      }
    }
  }
`;

const PROJECT = `#graphql
  query project($projectId: ID!) {
    project(id: $projectId) {
      id
      title
      location
      estimation {
        unit
        value
      }
      description
      categories {
        id
        name
      }
      experience_level
      required_skills {
        id
        name
      }
    }
  }
`;

const ADD_PROJECT = `#graphql
  mutation addProject($input: ProjectInput!) {
    addProject(input: $input) {
      id
      title
      location
      estimation {
        unit
        value
      }
      description
      categories {
        id
        name
      }
      experience_level
      required_skills {
        id
        name
      }
    }
  }
`;

const UPDATE_PROJECT = `#graphql
  mutation updateProject($id: ID!, $input: ProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      location
      estimation {
        unit
        value
      }
      description
      categories {
        id
        name
      }
      experience_level
      required_skills {
        id
        name
      }
    }
  }
`;

describe("Check projects controllers", () => {
  it("should return no projects as none exists", async () => {
    const response = await server.executeOperation<Record<string, Project>>(
      {
        query: PROJECTS,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.projects).toEqual([]);
  });
  it("should add a new project", async () => {
    const response = await server.executeOperation<Record<string, Project>>(
      { query: ADD_PROJECT, variables: { input: new_project } },
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
    expect(response.body.singleResult.data?.addProject.title).toEqual(
      new_project.title
    );
  });
  it("should not show the projects added to database, as the cache will not hydrated", async () => {
    const category1 = await models.Category.create({
      name: "Category1",
    });
    const category2 = await models.Category.create({
      name: "Category2",
    });

    const skill1 = await models.Skill.create({ name: "Skill1" });
    const skill2 = await models.Skill.create({ name: "Skill2" });
    const { id } = await db.models.Project.create({
      ...new_project,
      categories: [category1.id, category2.id],
      required_skills: [skill1.id, skill2.id],
    });

    const response = await server.executeOperation<Record<string, Project>>(
      {
        query: PROJECTS,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.projects).toHaveLength(1);
  });
  it("should update a project", async () => {
    // const category1 = await models.Category.create({
    //   name: "Category1",
    // });
    // const category2 = await models.Category.create({
    //   name: "Category2",
    // });

    // const skill1 = await models.Skill.create({ name: "Skill1" });
    // const skill2 = await models.Skill.create({ name: "Skill2" });
    const { id } = await db.models.Project.create({
      ...new_project,
      // categories: [category1.id, category2.id],
      // required_skills: [skill1.id, skill2.id],
    });

    const response = await server.executeOperation<Record<string, Project>>(
      {
        query: UPDATE_PROJECT,
        variables: {
          id,
          input: {
            title: "A changed title",
          },
        },
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );

    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.updateProject.title).toBe(
      "A changed title"
    );
  });
});
