import categoryResolver from "./category.resolver.js";
import healthResolver from "./health.resolver.js";
import skillResolver from "./skill.resolver.js";

const customScalarResolver = {};

export default [
  customScalarResolver,
  healthResolver,
  skillResolver,
  categoryResolver,
];
