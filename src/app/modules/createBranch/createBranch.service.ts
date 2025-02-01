import { TBranch } from "./createBranch.interface";
import { BranchModel } from "./createBranch.model";


const createBranchFromDB = async (payload: TBranch) => {
    const brunch = await BranchModel.find({});
    if (!brunch) {
        payload.id = 1
        const result = await BranchModel.create(payload);
        if (!result) {
            throw new Error("Branch is not created");   
        }
        return result;
    }else {
        payload.id = brunch.length + 1
        const result = await BranchModel.create(payload);
        if (!result) {
            throw new Error("Branch is not created");   
        }
        return result;
    }
}
const readBranchFromDB = async () => {
    const result = await BranchModel.find({});   
    return result;
}

const updateBranchFromDB = async (id : string ,payload : Partial<TBranch>) => {
    const  result = await BranchModel.findByIdAndUpdate(id, payload, {new : true});
    return result
}

const deleteBranchFromDB = async (id : string) => {
    const result = await BranchModel.findByIdAndDelete(id);
    return result
}

const getSingleBranchFromDB = async (id : string) => {
    const result = await BranchModel.findById(id);
    return result
} 
export const BranchService = { 
    createBranchFromDB,
    readBranchFromDB,
    updateBranchFromDB,
    deleteBranchFromDB,
    getSingleBranchFromDB,
 }