import mongoose from "mongoose";

export type TTitle = {
    title: string;
    branchName : string;
    branchId : mongoose.Types.ObjectId;
  }