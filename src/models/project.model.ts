import { EstimationUnit, ExperienceLevel } from "../helpers/enums.js";
import { Schema, model, Document } from "mongoose";
import { type Category } from "./category.model.js";
import { type Skill } from "./skill.model.js";
import { type User } from "./user.model.js";

interface Estimation {
  unit: Record<EstimationUnit, string>;
  value: number;
}

interface Attachment {
  name: string;
  url: string;
}

export interface Project extends Document {
  user: User;
  title: string;
  location: string;
  estimation: Estimation;
  description: string;
  categories: [Category];
  attachment: Attachment[];
  experience_level: Record<ExperienceLevel, string>;
  required_skills: [Skill];
  createdAt: string;
  updatedAt: string;
}

const projectSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    location: String,
    estimation: {
      unit: {
        type: String,
        enum: EstimationUnit,
        default: EstimationUnit.HOURS_PER_WEEK,
      },
      value: Number,
    },
    description: String,
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    attachments: [{ name: String, url: String }],
    experience_level: {
      enum: ExperienceLevel,
      type: String,
      default: ExperienceLevel.ENTRY_LEVEL,
    },
    required_skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  },
  { timestamps: true }
);

const Project = model<Project>("Project", projectSchema);
export default Project;
