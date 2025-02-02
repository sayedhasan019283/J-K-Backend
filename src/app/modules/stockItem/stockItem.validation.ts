import { z } from 'zod';
// Zod Validation Schema
const TitleValidation = z.object({
    body : z.object({
        title: z.string().min(1, 'Title is required'),
    })  
}); 
const updateTitleValidation = z.object({
    body : z.object({
        title: z.string().min(1, 'Title is required'),
    })
  }); 

export  const stockItemValidation = {
    TitleValidation,
    updateTitleValidation
}