import cemeterySchema from "./cemetery.schema.js";
import chapterSchema from "./chapter.schema.js";
import misclSchema from "./miscl.schema.js";
import trusteeSchema from "./trustee.schema.js";

const linkSchema = `#graphql
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  misclSchema,
  trusteeSchema,
  cemeterySchema,
  chapterSchema,
];
