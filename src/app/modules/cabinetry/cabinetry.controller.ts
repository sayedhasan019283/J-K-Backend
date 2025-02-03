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

export const cabinetryController = {
    createCabinetry,
};