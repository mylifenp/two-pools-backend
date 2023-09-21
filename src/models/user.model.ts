import { OrgRoles } from "@helpers/interfaces.js";
import { model, Schema } from "mongoose";

export interface User {
  id: string;
  email: string;
  preferred_username: string;
  name: string;
  given_name: string;
  family_name: string;
  org_roles: OrgRoles | undefined;
  organization: string;
}

const userSchema = new Schema(
  {
    email: String,
    preferred_username: String,
    name: String,
    given_name: String,
    family_name: String,
    org_roles: Object,
    organization: String,
  },
  { timestamps: true }
);

const User = model<User>("User", userSchema);
export default User;
