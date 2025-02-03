import mongoose, { Schema } from "mongoose";
import { TCategory } from "./category.interface";


const categorySchema = new mongoose.Schema<TCategory>({
    branchName: { type: String, required: true },
    branchID: { type: Schema.Types.ObjectId, ref: 'Branch' },
    title: { type: String, required: true, unique: true },
  });

export const CategoryModel = mongoose.model<TCategory>("category", categorySchema);