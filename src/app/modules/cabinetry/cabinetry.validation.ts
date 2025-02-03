import { z } from "zod";

const cabinetryValidationSchema = z.object({
  body : z.object({
    title: z.string().min(1, "Title is required"),
    subTitle: z.string().min(1, "Sub Title is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().optional(),
  })
});

export const cabinetryValidation = {
  cabinetryValidationSchema,
};
