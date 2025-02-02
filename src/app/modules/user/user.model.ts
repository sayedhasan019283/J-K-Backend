import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema: Schema = new Schema(
  {
    companyName: { type: String, required: true, default: "" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true, default: "" },
    addressLine2: { type: String },
    state: { type: String, required: true, default: "" },
    city: { type: String, required: true, default: "" },
    zipCode: { type: String, required: true, default: "" },
    businessLicense: { type: String, required: true, default: "" },
    driveingLicense: { type: String, required: true, default: "" },
    showroom: { type: Boolean, default: false },
    builder: { type: Boolean, default: false },
    designer: { type: Boolean, default: false },
    contractor: { type: Boolean, default: false },
    dealer: { type: Boolean, default: false },
    salesRepresentativeName: { type: String, required: true, default: "" },
    selectYourAgency: { type: String, required: true, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true, default: "" },
    termsAndCondition: { type: Boolean, required: true, default: false },
    branch: { type: String, required: true, default: "" },
    branchID: { type: Schema.Types.ObjectId, ref: 'Branch' },
    role: { type: String, enum: ["admin", "user", "super_admin", "sub-admin"], default: "user" },
    isBlocked: { type: Boolean, default: false },
    isverified: { type: Boolean, default: false },
    isSuspend: { type: Boolean, default: false },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

const UserModel = model<TUser>('User', UserSchema);

export default UserModel;