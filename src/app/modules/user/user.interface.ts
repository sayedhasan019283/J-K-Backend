import { USER_ROLE } from "./user.constant";

export type TUser = {
    _id?: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    addressLine2: string;
    state: string;
    city: string;
    zipCode:string;
    businessLicense: string;
    driveingLicense: string;
    showroom :boolean;
    builder : boolean;
    designer : boolean;
    contractor : boolean;
    dealer : boolean;
    salesRepresentativeName : string;
    selectYourAgency : string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndCondition: boolean;
    branch: string;    
    role: "admin" | "user" | "super_admin" | "sub-admin";
    isBlocked: boolean; // Added field
    isverified: boolean; // Added field
    isSuspend: boolean; // Added field
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TLoginUser = {
    email: string;
    password: string;
};
export type TForgetPassword = {
    newPassword: string;
    confirmNewPassword: string;
};
export type TResetPassword = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

  export type TUserRole = keyof typeof USER_ROLE;
  
