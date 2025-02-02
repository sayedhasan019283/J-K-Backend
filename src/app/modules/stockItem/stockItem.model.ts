import mongoose, { Schema } from "mongoose";
import { TTitle } from "./stockItem.interface";

// Mongoose Schema
const TitleSchema: Schema = new Schema({
    title: { type: String, required: true, unique : true },
  });


export const TitleModel = mongoose.model<TTitle>('Title', TitleSchema);