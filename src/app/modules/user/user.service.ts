import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TForgetPassword, TLoginUser, TResetPassword, TUser } from "./user.interface";
import UserModel from "./user.model"
import config from "../../config";
import { createToken } from "./user.utils";
import nodemailer from "nodemailer";
import mongoose, { get } from "mongoose";
import { BranchModel } from "../createBranch/createBranch.model";

const createUserIntoDB = async (userData: TUser) => {
  const user = await UserModel.findOne({ email: userData.email })
  if (user) {
    throw new Error("User exiest");
  }
  console.log(user)
  const newUser = await UserModel.create(userData)
  // Create the JWT payload
  const jwtPayload = {
    userId: newUser._id,
    role: newUser.role,
  };

  // Generate access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token: accessToken,
    data : newUser
  }
};

const getAllUserFromDB = async () => {

  const result = UserModel.find({});
  if (!result) {
    throw new Error("No User Found");
  }
  return result;
}



const updateUserFromDB = async (id: string, payload: Partial<TUser>,) => {

  // console.log( "pAYLOAD" ,payload)


  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true})
  // console.log("User Service" , result)
  if (!result) {
    throw new Error("Profile Not Updated Successfully");
  }
  return result;
}

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email and password are required!');
  }

  // Check if the user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Validate the password (basic string comparison)
  if (user.password !== password) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password!');
  }

  // Create the JWT payload
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  // Generate access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Return the generated access token
  return accessToken;
};





const blockUserfromDB = async (id: string) => {

  console.log(id);
  const result = await UserModel.find({ _id: id });
  if (result) {
    console.log("result :", result);
    // Update the isBlocked field to true
    const updatedResult = await UserModel.findByIdAndUpdate({ _id: id }, { isBlocked: true }, { new: true });
    console.log("Updated Result:", updatedResult);
    return updatedResult;
  } else {
    throw new Error("User Not Blocked Successfully");
  }

};
const suspendUserfromDB = async (id: string) => {
  console.log(id);
  const result = await UserModel.find({ _id: id });
  if (result) {
    console.log("result :", result);
    // Update the isBlocked field to true
    const updatedResult = await UserModel.findByIdAndUpdate({ _id: id }, { isSuspend: true }, { new: true });
    console.log("Updated Result:", updatedResult);
    return updatedResult;
  }


};

const forgetPasswordFromDB = async (payload: TForgetPassword, email: string) => {

  const newPassword = payload.newPassword;
  const confirmNewPassword = payload.confirmNewPassword;

  if (newPassword === confirmNewPassword) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      user.password = newPassword; // Update the password field
      await user.save(); // Save the updated user
      console.log("Password updated successfully for:", user);
      return user;
    } else {
      throw new Error("User not found");
    }
  } else {
    throw new Error("Both fields are not the same");
  }

};
const resetPasswordFromDB = async (payload: TResetPassword, id: string) => {

  const newPassword = payload.newPassword;
  const confirmNewPassword = payload.confirmNewPassword;
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    throw new Error("User Not found");
  }
  if (!(user.password === payload.oldPassword)) {
    throw new Error("Old Password Not Matched");
  }
  if (!(newPassword === confirmNewPassword)) {
    throw new Error("New password and confirm new password not matched");
  }
  user.password = newPassword;
  await user.save();
  return user;

}

const makeAdminFromDB = async (branchID : mongoose.Types.ObjectId ,payload: Partial<TUser>) => {
  const { email, password, message } = payload;
  payload.branchID = branchID;
  const branch = await BranchModel.findById(branchID);
  if (!branch) {
    throw new Error("Branch Not Found");
  }
  payload.branch = branch.name;
  const result = await UserModel.create(payload)
  if (!result) {
    throw new Error("Admin Not Created");
  } else {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Register In Database Yet for send mail His Cradential ");
    }
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'sayedhasan973@gmail.com', //sayedhasan973@gmail.com
        pass: 'xssp ebum kdxf eyvf',//xssp ebum kdxf eyvf
      },
    });

    // Email options
    const mailOptions = {
      from: 'sayedhasan973@gmail.com',
      to: email,
      subject: "J&K Official",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">Welcome to J&K!</h2>
            <p style="font-size: 16px; color: #333;">Congratulations! You have been promoted to an <strong>Admin</strong> on <strong>J&K</strong>. Below are your credentials to access your account:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Password</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${password}</td>
              </tr>
            </table>
            <p style="font-size: 16px; color: #333;">${message}</p>
            <p style="font-size: 16px; color: #333;">For your security, we recommend changing your password upon first login.</p>
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://J&K.com/login" style="background-color: #4CAF50; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Login to J&K</a>
            </p>
            <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #888; text-align: center;">If you did not request this, please contact us immediately at support@J&K.com.</p>
          </div>
        `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  }

  return result

}

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
}

const verifiedFromDB = async (id: string) => {
  const result = await UserModel.findByIdAndUpdate(id, { isVerified: true }, { new: true });
  return result
} 

export const userService = {
  createUserIntoDB,
  loginUser,
  updateUserFromDB,
  getAllUserFromDB,
  blockUserfromDB,
  suspendUserfromDB,
  forgetPasswordFromDB,
  resetPasswordFromDB,
  makeAdminFromDB,
  getSingleUserFromDB,
  verifiedFromDB
}