import { Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config.js";
import { authenticationErrors } from "./errors.js";
import { ResolversParentTypes } from "@generated/resolvers-types.js";
import { Context } from "@helpers/interfaces.js";
import { GraphQLError } from "graphql";

const pemCert = `
-----BEGIN PUBLIC KEY-----
${config.AUTH_PUBLIC_KEY}
-----END PUBLIC KEY-----
`;

const unknownUser = {
  name: "Unknown User",
  email_verified: true,
  preferred_username: "unknown",
  email: "unknown@test.de",
  org_roles: {},
  given_name: "Unknown",
  family_name: "User",
  organization: "default",
};

const removeBearer = (token: string) => token.replace("Bearer ", "");

export default function authenticateToken(req: Request) {
  const token = req.headers.access_token as string;
  const id_token = req.headers.id_token as string;
  const organization = (req.headers.organization as string) ?? "default";
  if (typeof token === "undefined" || typeof id_token === "undefined") {
    //return config.ENV === "development" ? unknownUser : undefined;
    return undefined;
  }
  if (!token) {
    throw authenticationErrors("No token provided");
  }

  if (!id_token) {
    throw authenticationErrors("No id_token provided");
  }
  try {
    validateToken(removeBearer(token)) as JwtPayload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw authenticationErrors("Token expired");
    }
    throw authenticationErrors("The provided token could not be verified");
  }
  try {
    const tokenInfo = validateToken(removeBearer(id_token)) as JwtPayload;
    const {
      name,
      email_verified,
      preferred_username,
      email,
      org_roles,
      given_name,
      family_name,
    } = tokenInfo;
    return {
      name,
      email_verified,
      preferred_username,
      email,
      org_roles,
      given_name,
      family_name,
      organization,
    };
  } catch (err) {
    throw authenticationErrors("Token could not be verified");
  }
}

export const validateToken = (token: string) => {
  return jwt.verify(token, pemCert, { algorithms: ["RS256"] });
};

export const isAuthenticated =
  () =>
  (next: any) =>
  (parent: ResolversParentTypes, args: any, context: Context) => {
    const { me } = context;
    if (!me) {
      throw new GraphQLError("You are not authenticated");
    }
    return next(parent, args, context);
  };

export const hasRole =
  (role: string) =>
  (next: any) =>
  (parent: ResolversParentTypes, args: any, context: Context) => {
    const { me } = context;
    if (!me) {
      throw new GraphQLError("You are not authenticated");
    }
    const { org_roles, organization } = me;
    const org = org_roles?.[organization];
    if (!org) {
      throw new GraphQLError("You are not authorized");
    }
    const { roles } = org;
    if (!roles.includes(role)) {
      throw new GraphQLError("You are not authorized");
    }

    return next(parent, args, context);
  };
