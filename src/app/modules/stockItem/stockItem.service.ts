import UserModel from "../user/user.model";
import { TTitle } from "./stockItem.interface";
import { TitleModel } from "./stockItem.model";

const createTitle = async (userId : string,payload: Partial<TTitle>) => {
    const adminCreadintial = await UserModel.findById(userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }
    payload.branchName = adminCreadintial.branch;
    payload.branchId = adminCreadintial.branchID;
    const result = await TitleModel.create(payload);
    return result;
} 

const readTitle = async (userId : string) => {
    const adminCreadintial = await UserModel.findById(userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }
    const branchName = adminCreadintial.branch;
    const branchId = adminCreadintial.branchID;
    const result = await TitleModel.find({branchName : branchName, branchId : branchId});
    return result;
}

const updateTitle = async (id: string, payload: Partial<TTitle>) => {
    const result = await TitleModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deleteTitle = async (id: string) => {
    const result = await TitleModel.findByIdAndDelete(id);
    return result;
}

export const StockItemService = {
    createTitle,
    readTitle,
    updateTitle,
    deleteTitle
}