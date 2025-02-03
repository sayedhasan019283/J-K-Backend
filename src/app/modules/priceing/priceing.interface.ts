import mongoose from "mongoose";

export type TShipping = {
    shipping: number;
    branchName : string;
    branchId : mongoose.Types.ObjectId;
  }

