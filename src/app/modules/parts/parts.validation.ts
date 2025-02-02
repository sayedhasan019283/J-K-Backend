import { z } from "zod";

const CreatePartSchema = z.object({
  body : z.object({
    title: z.string(),
    subTitle: z.string(),
    description: z.string(),
    price: z.string(),
  })
});
const UpdatePartSchema = z.object({
  body : z.object({
    title: z.string().min(1, "Title is required").trim().optional(),
    subTitle: z.string().min(1, "Sub Title is required").trim().optional(),
    description: z.string().min(1, "Description is required").trim().optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
  }).partial()
});

export const partValidation = {
  CreatePartSchema,
  UpdatePartSchema
};
