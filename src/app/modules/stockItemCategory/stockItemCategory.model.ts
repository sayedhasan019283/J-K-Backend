import  { model, Schema } from "mongoose";
import { TStockItemCategory } from "./stockItemCategory.interface";

const StockItemCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    stockItemId : { 
            type: Schema.Types.ObjectId, 
            ref: "Title", 
            required: true 
        },
    branchName : { 
      type: String, 
      required: true 
    },
    branchId : { 
      type: Schema.Types.ObjectId, 
      ref: 'Branch' 
    },
  },
  { timestamps: true }
);

export const StockItemCategoryModel = model<TStockItemCategory>("StockItemCategory", StockItemCategorySchema);

