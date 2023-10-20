import categorySchema from "./category.schema.js";
import emailSubscriptionSchema from "./email_subscription.schema.js";
import healthSchema from "./health.schema.js";
import misclSchema from "./miscl.schema.js";
import projectSchema from "./project.schema.js";
import skillSchema from "./skill.schema.js";
import userSchema from "./user.schema.js";

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
  skillSchema,
  categorySchema,
  projectSchema,
  userSchema,
  healthSchema,
  emailSubscriptionSchema,
];
