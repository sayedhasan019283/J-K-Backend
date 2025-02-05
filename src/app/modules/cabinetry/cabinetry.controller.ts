import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import catchAsync from "../../utils/catchAsync";
import { cabinetryService } from "./cabinetry.service";

const createCabinetry = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {userId} = req.user;
    const {id} = req.params;
    if (req.file) {
        payload.imageUrl = `/uploads/cabinetry/${req.file.filename}`;
      }
    const result = await cabinetryService.createCabinetry(userId,id,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cabinetry is not created");
    }
    res.status(200).json({
        success: true,
        message: "Cabinetry is created successfully",
        data: result,
    });
});

const readCabinetry = catchAsync(async (req, res, next) => {
    const {userId} = req.user
    const result = await cabinetryService.readCabinetry(userId);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cabinetry is not Retrived successfully");
    }
    res.status(200).json({
        success: true,
        message: "Cabinetry retrived successfully",
        data: result,
    });
});

const updateCabinetry = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {id} = req.params;
    if (req.file) {
        payload.imageUrl = `/uploads/cabinetry/${req.file.filename}`;
      }
    const result = await cabinetryService.updateCabinetry(id,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cabinetry is not updated");
    }
    res.status(200).json({
        success: true,
        message: "Cabinetry is updated successfully",
        data: result,
    });
});

const deleteCabinetry = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await cabinetryService.deleteCabinetry(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cabinetry is not Deleted");
    }
    res.status(200).json({
        success: true,
        message: "Cabinetry is deleted successfully",
        data: result,
    });
})

const readCabinetryWithoutlogin = catchAsync(async (req, res, next) => {
    const {branchId} = req.params
    const result = await cabinetryService.readCabinetryWithoutloginFromDB(branchId);
    if (!result || result.data.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cabinetry is not Retrived successfully");
    }
    res.status(200).json({
        success: true,
        message: "Cabinetry retrived successfully",
        data: result,
    });
});

export const cabinetryController = {
    createCabinetry,
    readCabinetry,
    updateCabinetry,
    deleteCabinetry,
    readCabinetryWithoutlogin,
};