import { z } from "zod";

const shippingAddressSchema = z.object({
    body: z.object({
        companyName: z.string().optional(),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        zipCode: z.string().min(4, "Zip code must be at least 4 characters"),
        country: z.string().min(1, "Country is required"),
        isBillingSame: z.boolean().default(true),
        products: z.array(
            z.object({
                image: z.string().min(1, "Image URL is required"),
                name: z.string().min(1, "Product name is required"),
                quantity: z.number().min(1, "Quantity must be at least 1"),
                assembly: z.string().nullable(),
                total: z.number().min(0, "Total must be a positive number"),
            })
        ).min(1, "At least one product is required"), // Added validation for products
    }),
});

export const orderValidation = {
    shippingAddressSchema,
};
