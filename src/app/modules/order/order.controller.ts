import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { orderService } from "./order.service";
import ApiError from "../../errors/ApiError";

const createOrder = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const {userId} = req.user;
    const result = await orderService.createOrderFromDB(userId,payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Order is not created");
    }
    res.status(200).json({
        success: true,
        message: "Order is created successfully",
        data: result,
    });
});

const readOrder = catchAsync(async (req, res, next) => {
    const {userId} = req.user
    const result = await orderService.readOrderFromDB(userId);
    if (!result) {    
        throw new ApiError(httpStatus.BAD_REQUEST, "Order is not Retrived successfully");
    }
    res.status(200).json({
        success: true,
        message: "Order retrived successfully",
        data: result,
    });
}); 

const updateOrder = catchAsync(async (req, res, next) => {    
    const payload = req.body;
    const {id} = req.params;
    const result = await orderService.updateOrderFromDB(id, payload);
    if (!result) {    
        throw new ApiError(httpStatus.BAD_REQUEST, "Order is not updated");
    }
    res.status(200).json({
        success: true,
        message: "Order is updated successfully",
        data: result,
    });
});


const deleteOrder = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const  result = await orderService.deleteOrderFromDB(id);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST , "Order Not Deleted Successfuly");
    }
    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
        data: result,
    });
});  

export const orderController = {
    createOrder,
    updateOrder, 
    readOrder, 
    deleteOrder,
}
