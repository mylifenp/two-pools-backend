import cemeteryResolver from "./cemetery.resolver.js";
import trusteeResolver from "./trustee.resolver.js";

const customScalarResolver = {};

export default [customScalarResolver, trusteeResolver, cemeteryResolver];
