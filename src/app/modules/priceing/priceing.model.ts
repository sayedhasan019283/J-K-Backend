import mongoose, { Schema } from "mongoose";
import { TShipping } from "./priceing.interface";

const ShippingSchema = new Schema<TShipping>(
    {
      shipping: { type: Number, required: true },
      branchName : { type: String, required: true },
      branchId : { type: Schema.Types.ObjectId, ref: 'Branch' },
    },
    { timestamps: true }
  );
  
  export const PriceingModel = mongoose.model<TShipping>("Shipping", ShippingSchema);