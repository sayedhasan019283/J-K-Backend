import mongoose, { Schema } from "mongoose";
import { TCabinetry } from "./cabinetry.interface";

const CabinetrySchema = new Schema<TCabinetry>(
    {
      title: { type: String, required: true, trim: true },
      subTitle: { type: String, required: true, trim: true },
      description: { type: String, required: true },
      categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
      branchId: { type: Schema.Types.ObjectId, ref: "Branch"},
      branchName: { type: String },
      imageUrl: { type: String, default: null }, // Optional image field
    },
    { timestamps: true }
  );
  
  export const CabinetryModel = mongoose.model<TCabinetry>("Cabinetry", CabinetrySchema);