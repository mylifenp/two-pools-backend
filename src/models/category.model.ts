import { Schema, model } from "mongoose";

export interface Category {
  name: string;
  createdAt: string;
  updatedAt: string;
}

const categorySchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Category = model<Category>("Category", categorySchema);
export default Category;
