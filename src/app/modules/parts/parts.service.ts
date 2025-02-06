import mongoose from "mongoose";
import { TPart } from "./parts.interface";
import { PartModel } from "./parts.model";
import UserModel from "../user/user.model";

const createPartFromDB = async (userId : string ,stockItemId : mongoose.Types.ObjectId ,payload: TPart) => {

    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    payload.branchName = user.branch;
    payload.branchId = user.branchID;
    payload.stockItemId = stockItemId;
    const result = await PartModel.create(payload);
    return result;
}

const readpartFromDB = async (userId : string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const branchName = user.branch;
    const branchId = user.branchID;
    const result = await PartModel.find({ branchId : branchId});
    return result;
}
const readpartWithoutLoginFromDB = async () => {
    const result = await PartModel.find();
    return result;
}

const updatepartFromDB = async (id : string ,payload : Partial<TPart>) => {
    const  result = await PartModel.findByIdAndUpdate(id, payload, {new : true});
    return result
}

const deletepartFromDB = async (id : string) => {
    const  result = await PartModel.findByIdAndDelete(id);
    return result
}

// export type TSearchQuery =  query: string;

  
const searchPartFromDB = async (query: string) => {
    if (!query) return []; // Return empty array if no query
  
    // Modify the search logic as per your schema, here searching by 'name'
    const items = await PartModel.find({
      title: { $regex: query, $options: 'i' }, // Case-insensitive regex search
    });
  
    return items;
  };


export const PartService = { 
    createPartFromDB,
    readpartWithoutLoginFromDB,
    updatepartFromDB,
    deletepartFromDB, 
    readpartFromDB,
    searchPartFromDB
}