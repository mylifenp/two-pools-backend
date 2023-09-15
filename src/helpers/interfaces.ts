import { type Request, type Response } from "express";
import { type RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import mongoose, { Models } from "mongoose";
// import { UserTokenInfo } from "helpers/interfaces";

export interface Context {
  req: Request;
  res: Response;
  pubsub: RedisPubSub;
  redisClient: Redis;
  db: typeof mongoose;
  models: Models;
  me: UserTokenInfo;
}

export interface UserTokenInfo {
  email: string;
  email_verified: boolean;
  preferred_username: string;
  name: string;
  given_name: string;
  family_name: string;
  org_roles: OrgRoles | undefined;
}

interface OrgRoles {
  [key: string]: {
    roles: string[];
    name: string;
  };
}
