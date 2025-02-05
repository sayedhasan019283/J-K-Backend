import mongoose from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { PartService } from "./parts.service";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";

const createPart = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {id} = req.params;
    const {userId} = req.user;
    const stockItemId = new mongoose.Types.ObjectId(id);
    payload.price = Number(payload.price);
    if (req.file) {
        payload.image = `/uploads/parts/${req.file.filename}`;
      }
    const result = await PartService.createPartFromDB(userId,stockItemId ,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Part is not created");
    }
    res.status(200).json({
        success: true,
        message: "Part is created successfully",
        data: result,
    });
});

const updatepart = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {id} = req.params;
    payload.price = Number(payload.price);
    if (req.file) {
        payload.image = `/uploads/parts/${req.file.filename}`;
      }
    const result = await PartService.updatepartFromDB(id ,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Part is not updated");
    }
    res.status(200).json({
        success: true,
        message: "Part is updated successfully",
        data: result,
    });
});

const deletepart = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const result = await PartService.deletepartFromDB(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Part is not deleted");
    }
    res.status(200).json({
        success: true,
        message: "Part is deleted successfully",
        data: result,
    });
});

const getAllPart = catchAsync(async (req, res, next) => {

    const {userId} = req.user;
    const result = await PartService.readpartFromDB(userId);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Part is not found");
    }
    res.status(200).json({
        success: true,
        message: "Part is retrived successfully",
        data: result,
    });
});
const readPartWithoutLogin = catchAsync(async (req, res, next) => {
    const result = await PartService.readpartWithoutLoginFromDB();
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Part is not found");
    }
    res.status(200).json({
        success: true,
        message: "Part is retrived successfully",
        data: result,
    });
});

export const partsController = {
    createPart,
    updatepart,
    deletepart,
    getAllPart,
    readPartWithoutLogin
}