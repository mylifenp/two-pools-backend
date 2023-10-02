import categoryResolver from "./category.resolver.js";
import emailSubscriptionResolver from "./email-subscription.resolver.js";
import healthResolver from "./health.resolver.js";
import projectResolver from "./project.resolver.js";
import skillResolver from "./skill.resolver.js";
import userResolver from "./user.resolver.js";

const customScalarResolver = {};

export default [
  customScalarResolver,
  healthResolver,
  skillResolver,
  categoryResolver,
  projectResolver,
  userResolver,
  emailSubscriptionResolver,
];
