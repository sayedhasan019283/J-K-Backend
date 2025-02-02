import { TTitle } from "./stockItem.interface";
import { TitleModel } from "./stockItem.model";

const createTitle = async (payload: Partial<TTitle>) => {
    const result = await TitleModel.create(payload);
    return result;
} 

const readTitle = async () => {
    const result = await TitleModel.find();
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