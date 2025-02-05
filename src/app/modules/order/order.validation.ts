import { z } from "zod";

export const shippingAddressSchema = z.object({
  body :  z.object({
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
  })
});
