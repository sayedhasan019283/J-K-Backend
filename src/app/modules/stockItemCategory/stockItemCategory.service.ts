import mongoose from "mongoose"
import { TStockItemCategory } from "./stockItemCategory.interface"
import { StockItemCategoryModel } from "./stockItemCategory.model"
import UserModel from "../user/user.model";

const createstockItemCategory = async(userId : string ,stockItemId : mongoose.Types.ObjectId, payload : TStockItemCategory) => {
    const adminCreadintial = await UserModel.findById(userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }
    payload.branchName = adminCreadintial.branch;
    payload.branchId = adminCreadintial.branchID;
    payload.stockItemId = stockItemId;
    const result = await StockItemCategoryModel.create(payload);
    return result;
}

const readStockItemCategory = async(userId : string) => {
    const adminCreadintial = await UserModel.findById(userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }
    const branchName = adminCreadintial.branch;
    const branchId = adminCreadintial.branchID;
    const result = await StockItemCategoryModel.find({branchName : branchName, branchId : branchId});
    return result;
}

const readStockItemCategoryById = async(stockItemCategoryId : string) => {
    const result = await StockItemCategoryModel.findById({_id :stockItemCategoryId}); 
    return result; 
}

const updateStockItemCategory = async (stockItemCategoryId : string, payload: TStockItemCategory) => {
    const result = await StockItemCategoryModel.findByIdAndUpdate(stockItemCategoryId, payload);
    return result;
}

const deleteStockItemCategory = async (stockItemCategoryId : string) =>{
    const result = await StockItemCategoryModel.findByIdAndDelete(stockItemCategoryId);
    return result;
}

export const stockItemCategoryService = {
    createstockItemCategory,
    readStockItemCategory,
    readStockItemCategoryById,
    deleteStockItemCategory,
    updateStockItemCategory
}