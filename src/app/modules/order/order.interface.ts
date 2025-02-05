import mongoose from "mongoose";

export type TOrder = {
    userId: mongoose.Schema.Types.ObjectId;
    branchId: mongoose.Schema.Types.ObjectId;
    companyName?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    status: "new order" | "in progress" | "canceled" | "delivered";
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isBillingSame: boolean;
  }