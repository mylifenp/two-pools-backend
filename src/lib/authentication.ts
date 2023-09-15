import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config.js";
import { authenticationErrors } from "./errors.js";

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
};

const removeBearer = (token: string) => token.replace("Bearer ", "");

export default function authenticateToken(req: Request) {
  const token = req.headers.access_token as string;
  const id_token = req.headers.id_token as string;
  if (typeof token === "undefined" || typeof id_token === "undefined") {
    return unknownUser;
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
    };
  } catch (err) {
    throw authenticationErrors("Token could not be verified");
  }
}

export const validateToken = (token: string) => {
  return jwt.verify(token, pemCert, { algorithms: ["RS256"] });
};
