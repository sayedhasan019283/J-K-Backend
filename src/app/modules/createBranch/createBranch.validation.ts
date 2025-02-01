import { z } from "zod";

const branchValidationSchema = z.object({
  body : z.object({
    name: z.string().min(1, "Name is required").trim(),
  address: z.string().min(1, "Address is required").trim(),
  mobile: z.string().min(1, "Mobile number is required").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  })
});

export const branchValidation = {
  branchValidationSchema,
};
