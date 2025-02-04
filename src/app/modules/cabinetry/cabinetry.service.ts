import { CategoryModel } from "../category/category.model";
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

const readCabinetry = async (userId: string) => {
    const adminCreadintial = await UserModel.findById(userId);
    if (!adminCreadintial) {
        throw new Error("Admin Not Found");
    }

    const branchID = adminCreadintial.branchID;
    const branch = adminCreadintial.branch;

    // Fetch cabinetry data based on branch
    const cabinetryData = await CabinetryModel.find({ branchId: branchID, branchName: branch });

    // Fetch unique category IDs
    const categoryIds = [...new Set(cabinetryData.map(item => item.categoryId))];

    // Fetch category details for each unique categoryId
    const categories = await CategoryModel.find({ _id: { $in: categoryIds } });

    // Group cabinetry data by category
    const categorizedData = categories.map(category => {
        return {
            categoryId: category._id,
            categoryName: category.title, // Assuming `name` is the category title
            data: cabinetryData.filter(item => item.categoryId.toString() === category._id.toString())
        };
    });

    return {
        success: true,
        message: "Cabinetry retrieved successfully",
        data: categorizedData
    };
};


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