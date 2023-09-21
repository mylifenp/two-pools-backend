import { BaseContext } from "@apollo/server";
import { type Request, type Response } from "express";
import { type RedisPubSub } from "graphql-redis-subscriptions";
import { type Redis } from "ioredis";
import { Models, Mongoose } from "mongoose";

export interface Context extends BaseContext {
  req?: Request;
  res?: Response;
  pubsub: RedisPubSub;
  redisClient: Redis;
  db: Mongoose;
  models: Models;
  me?: UserTokenInfo;
}

export interface UserTokenInfo {
  email: string;
  email_verified: boolean;
  preferred_username: string;
  name: string;
  given_name: string;
  family_name: string;
  org_roles: OrgRoles | undefined;
  organization: string;
}

interface OrgRoles {
  [key: string]: {
    roles: string[];
    name: string;
  };
}
