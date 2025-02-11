import { z } from "zod";

export const stockItemCategorySchema = z.object({
  body  : z.object({
    title: z.string()
  })
});
;

export const  validateStockItemCategory = {
    stockItemCategorySchema
};
