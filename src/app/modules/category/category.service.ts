import UserModel from "../user/user.model";
import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";


const createCategoryFromDB = async (userId : string ,payload : TCategory) => {
    const adminCreadintial = await UserModel.findById(   userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }
    payload.branchName = adminCreadintial.branch;
    payload.branchID = adminCreadintial.branchID;
    const result = await CategoryModel.create(payload);
    return result;
}


const updateCategoryFromDB = async (id : string ,payload : Partial<TCategory>) => {
    const result = await CategoryModel.findByIdAndUpdate(id, payload, {new : true});
    return result
}

const readAllCategory = async () => {
    const result = await CategoryModel.find({});
    return result
}

const deleteCategoryFromDB = async (id : string) => {
    const result = await CategoryModel.findByIdAndDelete(id);
    return result
}
export const CategoryService = {
    createCategoryFromDB,
    updateCategoryFromDB,
    readAllCategory,
    deleteCategoryFromDB
}

