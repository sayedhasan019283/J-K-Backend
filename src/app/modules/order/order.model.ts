import mongoose, { Schema } from "mongoose";
import { TOrder, TProduct } from "./order.interface";

const ProductSchema = new Schema<TProduct>({
    image: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    assembly: { type: String, default: null },
    total: { type: Number, required: true },
});

const ShippingAddressSchema = new Schema<TOrder>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        branchId: { type: Schema.Types.ObjectId, ref: "Branch", default: null },
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
        products: { type: [ProductSchema], required: true }, // Added products field
    },
    { timestamps: true }
);

export const OrderModel = mongoose.model<TOrder>("Order", ShippingAddressSchema);
