import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const ShippingAddressSchema = new Schema<TOrder>(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
      companyName: { type: String },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      status: {
        type: String,
        enum: ["new order", "in progress", "canceled", "delivered"],
        default: "new order",
      },
      isBillingSame: { type: Boolean, default: true },
    },
    { timestamps: true }
  );

  export const ShippingAddressModel = mongoose.model<TOrder>("Order",ShippingAddressSchema);