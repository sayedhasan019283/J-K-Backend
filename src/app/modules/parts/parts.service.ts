import mongoose from "mongoose";
import { TPart } from "./parts.interface";
import { PartModel } from "./parts.model";

const createPartFromDB = async (stockItemId : mongoose.Types.ObjectId ,payload: TPart) => {
     payload.stockItemId = stockItemId;
    const result = await PartModel.create(payload);
    return result;
}

const readpartFromDB = async () => {
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

export const PartService = { 
    createPartFromDB,
    readpartFromDB,
    updatepartFromDB,
    deletepartFromDB, 
}