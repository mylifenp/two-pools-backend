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
import { Category } from "../src/generated/resolvers-types";
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
  await redisClient.flushall();
});

const category_name = "A test Category12";
const CATEGORY = `#graphql
  query Category($categoryId: ID!) {
    category(id: $categoryId) {
      id
      name
    }
  }
`;

const CATEGORIES = `#graphql
  query categories {
    categories {
      id
      name
    }
  }
`;
const ADD_CATEGORY = `#graphql
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`;
const UPDATE_CATEGORY = `#graphql
  mutation updateCategory($categoryId: ID!, $name: String!) {
    updateCategory(id: $categoryId, name: $name) {
      id
      name
    }
  }
`;

const DELETE_CATEGORY = `#graphql
      mutation deleteCategory($categoryId: ID!) {
        deleteCategory(id: $categoryId) {
          id
          name
        }
      }
    `;

describe("Check categories controllers", () => {
  it("query should return no categories as none exists", async () => {
    const response = await server.executeOperation<Record<string, Category>>(
      {
        query: CATEGORIES,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.categories).toEqual([]);
  });
  it("should add a new category", async () => {
    const response = await server.executeOperation<Record<string, Category>>(
      {
        query: ADD_CATEGORY,
        variables: { name: category_name },
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.addCategory.name).toEqual(
      category_name
    );
  });
  it("should get the currently created category", async () => {
    const { id } = await models.Category.create({
      name: category_name,
    });
    const response = await server.executeOperation<Record<string, Category>>(
      {
        query: CATEGORY,
        variables: { categoryId: `${id}` },
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.category.name).toEqual(
      category_name
    );
  });
  it("should update the category name", async () => {
    const { id } = await models.Category.create({
      name: category_name,
    });
    const new_category_name = "New Category Name changed";
    const response = await server.executeOperation<Record<string, Category>>(
      {
        query: UPDATE_CATEGORY,
        variables: { categoryId: `${id}`, name: new_category_name },
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.updateCategory.name).toEqual(
      new_category_name
    );
  });
  it("should get all categories", async () => {
    const categories = [
      { name: "A new test Category" },
      { name: "A new test Category2" },
    ];
    await models.Category.insertMany(categories);
    const response = await server.executeOperation<Record<string, Category>>(
      {
        query: CATEGORIES,
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.categories).toHaveLength(2);
  });
  it("should delete a category", async () => {
    const { id } = await models.Category.create({ name: category_name });

    const response = await server.executeOperation<Record<string, Category>>(
      {
        query: DELETE_CATEGORY,
        variables: { categoryId: `${id}` },
      },
      { contextValue: { db, pubsub, redisClient, models } }
    );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.deleteCategory.name).toEqual(
      category_name
    );
  });
});
