import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import catchAsync from "../../utils/catchAsync";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {userId} = req.user;
    const result = await CategoryService.createCategoryFromDB(userId,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Category is not created");
    }
    res.status(200).json({
        success: true,
        message: "Category is created successfully",
        data: result,
    });
});

const updateCategory = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {id} = req.params;
    const result = await CategoryService.updateCategoryFromDB(id,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Category is not updated");
    }
    res.status(200).json({
        success: true,
        message: "Category is updated successfully",
        data: result,
    });
});

const deleteCategory = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const result = await CategoryService.deleteCategoryFromDB(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Category is not deleted");
    }
    res.status(200).json({
        success: true,
        message: "Category is deleted successfully",
        data: result,
    });
});


const readAllCategory = catchAsync(async (req, res, next) => {
    const result = await CategoryService.readAllCategory();
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Category is not found");
    }
    res.status(200).json({
        success: true,
        message: "Category is retrived successfully",
        data: result,
    }); 
})


export const categoryController = {
    createCategory,
    updateCategory,
    deleteCategory,
    readAllCategory
}