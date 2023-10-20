import { Request } from "express";
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

const removeBearer = (token: string) => token.replace("Bearer ", "");
export const validateToken = (token: string) => {
  return jwt.verify(token, pemCert, { algorithms: ["RS256"] });
};

export const isTokenValid = (
  params: Readonly<Record<string, unknown> | undefined>
) => {
  const access_token = params?.access_token as string;
  const id_token = params?.id_token as string;
  if (!access_token || !id_token) {
    return false;
  }
  const tokenInfo = validateToken(removeBearer(id_token)) as JwtPayload;
  if (!tokenInfo) {
    return false;
  }
  const { email_verified } = tokenInfo;
  if (!email_verified) {
    return false;
  }
  return true;
};

export default function authenticateToken(req: Request) {
  const access_token = req.headers.access_token as string;
  const id_token = req.headers.id_token as string;
  const organization = (req.headers.organization as string) ?? "default";
  // console.log("access_token", access_token);
  if (!access_token || !id_token) {
    return undefined;
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
    if (err instanceof jwt.TokenExpiredError) {
      throw authenticationErrors("Token expired");
    }
    throw authenticationErrors("Token could not be verified");
  }
}

// export const isSubscriptionAuthenticated =
//   () => (next: any) => (ctx: WsContext) => {
//     console.log("ctx", ctx.connectionParams);
//     throw new GraphQLError("You are not authenticated");
//   };

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
      throw authenticationErrors("You are not authenticated");
    }
    const { org_roles, organization } = me;
    const org = org_roles?.[organization];
    if (!org) {
      throw authenticationErrors("You are not authorized");
    }
    const { roles } = org;
    if (!roles.includes(role)) {
      throw authenticationErrors("You are not authorized");
    }

    return next(parent, args, context);
  };
