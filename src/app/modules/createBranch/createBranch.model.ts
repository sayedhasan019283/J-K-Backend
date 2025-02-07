import mongoose, { Schema } from "mongoose";
import { TBranch } from "./createBranch.interface";
const BranchSchema: Schema = new Schema(
    {
      id : { type: Number, unique: true },
      name: { type: String, required: true, unique: true, trim: true },
      address: { type: String, required: true, trim: true },
      mobile: { type: String, required: true},
      tax : { type: Number, required: true },
      fbLink : { type: String, required: true },
      instaLink : { type: String, required: true },
      email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    },
    {
      timestamps: true,
    }
  );

  // Ensure unique indexes are created
BranchSchema.index({ name: 1 }, { unique: true });
BranchSchema.index({ email: 1 }, { unique: true });


  export const BranchModel = mongoose.model<TBranch>("Branch", BranchSchema);