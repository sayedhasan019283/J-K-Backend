import { z } from "zod";

export const shippingValidationSchema = z.object({
  body: z.object({
    shipping: z.number().min(0, "Shipping cost must be a positive number"),
  }),
});

export const shippingValidation = {
  shippingValidationSchema,
};
