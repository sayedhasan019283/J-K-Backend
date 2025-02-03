import UserModel from "../user/user.model";
import { CabinetryModel } from "./cabinetry.model";

const createCabinetry = async (userId : string, id: string,payload: any) => {
    payload.categoryId = id;
    const adminCreadintial = await UserModel.findById(   userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }
    payload.branchName = adminCreadintial.branch;
    payload.branchId = adminCreadintial.branchID;
    const result = await CabinetryModel.create(payload);
    return result;
}

const readCabinetry = async () => {
    const result = await CabinetryModel.find({});
    return result;
}

const updateCabinetry = async (id: string, payload: any) => {
    const result = await CabinetryModel.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const deleteCabinetry = async (id: string) => {
    const result = await CabinetryModel.findByIdAndDelete(id);
    return result;
}

export const cabinetryService = {
    createCabinetry,
    readCabinetry,
    updateCabinetry,
    deleteCabinetry
}