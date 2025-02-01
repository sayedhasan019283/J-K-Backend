import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BranchService } from "./createBranch.service";
import ApiError from "../../errors/ApiError";



const createBranch = catchAsync(async (req, res, next) => {
    const payload = req.body;
    console.log(payload)
    const result = await  BranchService.createBranchFromDB(payload);
    if (!result) {
        throw new ApiError( httpStatus.BAD_REQUEST, "Branch is not created");
    }
    res.status(200).json({
        success: true,
        message: "Branch is created successfully",
        data: result,
    });
});

const readBranch = catchAsync(async (req, res, next) => {
    const result = await  BranchService.readBranchFromDB();
    if (!result) {
        throw new ApiError( httpStatus.BAD_REQUEST, "Branch is not Retrived successfully");
    }
    res.status(200).json({
        success: true,
        message: "Branch retrived successfully",
        data: result,
    });
})  

const updateBranch = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {id}  = req.params 
    const result = await  BranchService.updateBranchFromDB( id ,payload);  
    if (!result) {
        throw new ApiError( httpStatus.BAD_REQUEST, "Branch is not Updated");
    }  
    res.status(200).json({
        success: true,
        message: "Branch is updated successfully",
        data: result,
    });
})

const deleteBranch = catchAsync(async (req, res, next) => {
    const {id}  = req.params 
    const result = await  BranchService.deleteBranchFromDB( id );  
    if (!result) {
        throw new ApiError( httpStatus.BAD_REQUEST, "Branch is not Deleted");
    }  
    res.status(200).json({
        success: true,
        message: "Branch is deleted successfully",
        data: result,
    });
})

const getSingleBranch = catchAsync(async (req, res, next) => {
    const {id}  = req.params 
    const result = await  BranchService.getSingleBranchFromDB( id );  
    if (!result) {
        throw new ApiError( httpStatus.BAD_REQUEST, "Branch is not Found");
    }  
    res.status(200).json({
        success: true,
        message: "Branch is retrived successfully",
        data: result,
    });
})
export const createBranchController = {
    createBranch,
    readBranch,
    updateBranch,
    deleteBranch,
    getSingleBranch,
}