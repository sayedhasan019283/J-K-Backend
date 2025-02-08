import mongoose from "mongoose";
import UserModel from "../user/user.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";
import { BranchModel } from "../createBranch/createBranch.model";

const createOrderFromDB = async (userId : mongoose.Types.ObjectId, payload : TOrder) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    console.log("user Branch", user.branch)
    const branchData = await BranchModel.find({name : user.branch});
    if (!branchData || branchData.length === 0) {
        throw new Error(" Branch name is not found");
    }
    // console.log("branchData" , branchData)
    payload.userId = userId; 
    payload.branchId = branchData[0]._id;
    // payload.branchId = branchData[0]._id;
    const order = await OrderModel.create(payload);
    console.log("order" , order);
    if (!order) {
        throw new Error("Order is not created");
    }
    return order;
}


const readOrderFromDB = async (userId : mongoose.Types.ObjectId) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const branchId = user.branchID;
    const order = await OrderModel.find({branchId : branchId});
    if (!order) {
        throw new Error("Order is not found");
    }
    return order;
}

const updateOrderFromDB = async (id : string, payload : TOrder) => {
    const order = await OrderModel.findByIdAndUpdate(id, payload, {new : true});
    if (!order) {
        throw new Error("Order is not found");
    }
    return order;
}

const deleteOrderFromDB = async (id : string) => {
    const order = await OrderModel.findByIdAndDelete(id);
    if (!order) {
        throw new Error("Order is not found");
    }
    return order;
}

export const orderService = {
    createOrderFromDB, 
    readOrderFromDB, 
    updateOrderFromDB, 
    deleteOrderFromDB
};