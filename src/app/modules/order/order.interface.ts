import mongoose from "mongoose";

export type TProduct = {
   image: string;
    name: string;
    quantity: number;
    assembly: string | null;
    total: number;
};

export type TOrder = {
    userId: mongoose.Types.ObjectId;
    branchId: mongoose.Types.ObjectId;
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
    subTotal: number;
    salesTax: number;
    total: number;
    isBillingSame: boolean;
    products: TProduct[]; // Added products array
};
