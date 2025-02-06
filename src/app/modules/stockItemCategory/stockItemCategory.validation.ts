import { z } from "zod";

export const stockItemCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
});
;

export const  validateStockItemCategory = {
    stockItemCategorySchema
};
