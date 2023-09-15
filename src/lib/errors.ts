import { GraphQLError } from "graphql";

export function authenticationErrors(message: string) {
  return new GraphQLError(message, {
    extensions: {
      code: "UNAUTHENTICATED",
      http: { status: 401 },
    },
  });
}
