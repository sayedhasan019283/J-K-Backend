import mongoose from "mongoose";

export type TCategory = {
    branchID: mongoose.Types.ObjectId
    branchName: string;
    title: string;
}