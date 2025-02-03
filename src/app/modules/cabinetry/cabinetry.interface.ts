import mongoose from "mongoose";

export type TCabinetry = {
    title: string;
    subTitle: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    branchId: mongoose.Types.ObjectId;
    branchName: string;
    imageUrl?: string;
  }