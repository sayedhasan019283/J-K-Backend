import mongoose, { Schema } from "mongoose";
import { TTitle } from "./stockItem.interface";

// Mongoose Schema
const TitleSchema: Schema = new Schema({
    title: { type: String, required: true, unique : true },
    branchName : { type: String, required: true },
    branchId : { type: Schema.Types.ObjectId, ref: 'Branch' },
  });


export const TitleModel = mongoose.model<TTitle>('Title', TitleSchema);