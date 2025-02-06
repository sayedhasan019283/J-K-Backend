import mongoose from "mongoose";

export type TStockItemCategory = {
    stockItemId : mongoose.Types.ObjectId
    title : string;
    branchName : string;
    branchId : mongoose.Types.ObjectId;
}