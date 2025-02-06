import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { stockItemCategoryService } from "./stockItemCategory.service";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";


const createstockItemCategory = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {userId} = req.user
    const stockItemId = new mongoose.Types.ObjectId(req.params.stockItemId);
    const result = await stockItemCategoryService.createstockItemCategory(userId ,stockItemId, payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST ,"Stock item category not created");
    }
    res.status(200).json({
        success: true,
        message: "Stock item category created successfuly",
        data: result,
    });
})

const readStockItemCategory = catchAsync(async (req, res, next) => {
    const {userId} = req.user 
    const result = await stockItemCategoryService.readStockItemCategory(userId)
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST ,"No data Found");
    }
    res.status(200).json({
        success: true,
        message: "All Stock Item Category Retrive",
        data: result,
    });
})

const readStockItemCategoryById = catchAsync(async (req, res, next)=> {
    const {stockItemCategoryId} = req.user;
    const result = await stockItemCategoryService.readStockItemCategoryById(stockItemCategoryId);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST ,"Didn't get data by id");
    }
    res.status(200).json({
        success: true,
        message: "Get Single Data By Id",
        data: result,
    });
})

const updateStockItemCategory = catchAsync(async (req, res, next) => {
    const {stockItemCategoryId} = req.params;
    const payload = req.body;
    const result = await stockItemCategoryService.updateStockItemCategory(stockItemCategoryId, payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST ,"Didn't update successfuly");
    }
    res.status(200).json({
        success: true,
        message: "Update Successfuly Done",
        data: result,
    });
})

const deleteStockItemCategory = catchAsync(async(req, res, next) => {
    const {stockItemCategoryId} = req.params;
    const  result = await stockItemCategoryService.deleteStockItemCategory(stockItemCategoryId);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST,"Didn't Delete successfuly!");
    }
    res.status(200).json({
        success: true,
        message: "Delete Successful",
        data: result,
    });
})


export const stockItemCategoryontroller = {
    createstockItemCategory,
    readStockItemCategory,
    updateStockItemCategory,
    deleteStockItemCategory,
    readStockItemCategoryById,
}