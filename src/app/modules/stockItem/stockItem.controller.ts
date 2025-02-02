import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import catchAsync from "../../utils/catchAsync";
import { StockItemService } from "./stockItem.service";

const createTitle = catchAsync(async (req, res, next) => {
    const payload = req.body;
    
    console.log("pAYLOAD" ,typeof payload.title)
   
    const result = await StockItemService.createTitle(payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Title is not created");
    }
    res.status(200).json({
        success: true,
        message: "Title is created successfully",
        data: result,
    });
});

const readTitle = catchAsync(async (req, res, next) => {
    const result = await StockItemService.readTitle();
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Title is not Retrived successfully");
    }
    res.status(200).json({
        success: true,
        message: "Title retrived successfully",
        data: result,
    });
}) 

const updateTitle = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const { id } = req.params
    const result = await StockItemService.updateTitle(id, payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Title is not updated");
    }
    res.status(200).json({
        success: true,
        message: "Title is updated successfully",
        data: result,
    });
})

const deleteTitle = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await StockItemService.deleteTitle(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Title is not Deleted");
    }
    res.status(200).json({
        success: true,
        message: "Title is deleted successfully",
        data: result,
    });
})

export const stockItemController = {
    createTitle,
    readTitle,
    updateTitle,
    deleteTitle
};