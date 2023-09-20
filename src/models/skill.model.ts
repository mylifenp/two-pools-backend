import { Schema, model } from "mongoose";

export type Skill = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const skillSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Skill = model<Skill>("Skill", skillSchema);
export default Skill;
