import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import catchAsync from "../../utils/catchAsync";
import { PriceingService } from "./priceing.service";

const createPriceing = catchAsync(async (req, res, next) => {
    const payload = req.body; 
    const userId = req.user.userId
    const result = await PriceingService.createPriceingFromDB(userId ,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Priceing is not created");
    }
    res.status(200).json({
        success: true,
        message: "Priceing is created successfully",
        data: result,   
    })
});

const readAllPriceing = catchAsync(async (req, res, next) => {
    const result = await PriceingService.getAllPriceingFromDB();
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Priceing is not Retrived successfully");
    }
    res.status(200).json({
        success: true,
        message: "Priceing retrived successfully",
        data: result,
    });
});

const updatePriceing = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const payload = req.body;
    const result = await PriceingService.updatePriceingFromDB(id,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Priceing is not updated");
    }
    res.status(200).json({
        success: true,
        message: "Priceing is updated successfully",
        data: result,
    });
});

const deletePriceing = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await PriceingService.deletePriceingFromDB(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Priceing is not Deleted");
    }
    res.status(200).json({
        success: true,
        message: "Priceing is Deleted successfully",
        data: result,
    })
})

export const priceingController = {
    createPriceing,
    readAllPriceing,
    updatePriceing,
    deletePriceing
};