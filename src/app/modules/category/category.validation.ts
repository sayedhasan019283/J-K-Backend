import { z } from "zod";

const categoryValidationSchema = {
    body : z.object({
        title: z.string().min(1, 'Title is required'),
    })  
};

export const categoryValidation = {
    categoryValidationSchema
}