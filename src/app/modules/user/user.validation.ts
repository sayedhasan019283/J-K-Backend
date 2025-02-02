import { z } from 'zod';

const UserSchema = z.object({
  body: z.object({
    companyName: z.string(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    addressLine2: z.string().optional(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
    showroom: z.boolean().optional(),
    builder: z.boolean().optional(),
    designer: z.boolean().optional(),
    contractor: z.boolean().optional(),
    dealer: z.boolean().optional(),
    salesRepresentativeName: z.string().min(1, "Sales Representative Name is required"),
    selectYourAgency: z.string().min(1, "Agency selection is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
    termsAndCondition: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    branch: z.string().min(1, "Branch is required"),
    role: z.enum(["admin", "user", "super_admin", "sub-admin"]).default("user"),
    isBlocked: z.boolean().optional(),
    isverified: z.boolean().optional(),
    isSuspend: z.boolean().optional(),
    message: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

const AdminCreateAdminSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["admin", "user", "super_admin"]).default("user"),
    message: z.string().optional(),
  }),
});

const UpdateUserSchema = z.object({
  body: z.object({
    companyName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    addressLine2: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    businessLicense: z.string().optional(),
    driveingLicense: z.string().optional(),
    showroom: z.boolean().optional(),
    builder: z.boolean().optional(),
    designer: z.boolean().optional(),
    contractor: z.boolean().optional(),
    dealer: z.boolean().optional(),
    salesRepresentativeName: z.string().optional(),
    selectYourAgency: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long").optional(),
    termsAndCondition: z.boolean().optional(),
    branch: z.string().optional(),
    role: z.enum(["admin", "user", "super_admin", "sub-admin"]).optional(),
    isBlocked: z.boolean().optional(),
    isverified: z.boolean().optional(),
    isSuspend: z.boolean().optional(),
    message: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email address"),
    password: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
  }),
});
const ForgetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
    confirmNewPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
  }),
});
const ResetPasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
    newPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
    confirmNewPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
  }),
});


export const userValidation = {
    UserSchema,
    LoginValidationSchema,
    UpdateUserSchema,
    ForgetPasswordValidationSchema,
    ResetPasswordValidationSchema,
    AdminCreateAdminSchema
};
