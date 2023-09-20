import { model, Schema } from "mongoose";

export interface User {
  email: string;
  oidc_id: string;
  profile_url: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema(
  {
    email: String,
    oidc_id: String,
    profile_url: String,
  },
  { timestamps: true }
);

const User = model<User>("User", userSchema);
export default User;
