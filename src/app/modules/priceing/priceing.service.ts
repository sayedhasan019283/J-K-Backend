import UserModel from "../user/user.model";
import { PriceingModel } from "./priceing.model";

const createPriceingFromDB = async (userId : string ,payload: any) => {
    const adminCreadintial = await UserModel.findById(userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }
    payload.branchName = adminCreadintial.branch;
    payload.branchId = adminCreadintial.branchID;
    const result = await PriceingModel.create(payload);
    return result;
} 

const updatePriceingFromDB = async (id: string, payload: any) => {
    const result = await PriceingModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deletePriceingFromDB = async (id: string) => {
    const result = await PriceingModel.findByIdAndDelete(id);
    return result;
}

const getSinglePriceingFromDB = async (id: string) => {
    const result = await PriceingModel.findById(id);
    return result;
}   

const getAllPriceingFromDB = async () => {
    const result = await PriceingModel.find({});
    return result;
}

export const PriceingService = {
    createPriceingFromDB,
    updatePriceingFromDB,
    deletePriceingFromDB,
    getSinglePriceingFromDB,
    getAllPriceingFromDB
}