import mongoose, { Schema } from "mongoose";
import { TPart } from "./parts.interface";

const CabinetSchema: Schema = new Schema(
    {
      image: { type: String, required: true },
      title: { type: String, required: true, trim: true },
      subTitle: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      price: { type: Number, required: true, min: 0 },
      stockItemId : { type: Schema.Types.ObjectId, ref: 'Title' },
      branchName : { type: String, required: true },
      branchId : { type: Schema.Types.ObjectId, ref: 'Branch' },
    },
    { timestamps: true }
  );
  
 export const PartModel = mongoose.model<TPart>("part", CabinetSchema);