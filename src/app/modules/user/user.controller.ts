/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { TUser } from './user.interface';
import { userService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import UserModel from './user.model';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;
    const files = req.files as {
      businessLicense?: { filename: string }[];
      driveingLicense?: { filename: string }[];
    };


    if (files?.businessLicense && files.businessLicense[0]?.filename) {
      payload.businessLicense = `/uploads/users/${files.businessLicense[0].filename}`;
    }

    if (files?.driveingLicense && files.driveingLicense[0]?.filename) {
      payload.driveingLicense = `/uploads/users/${files.driveingLicense[0].filename}`;
    }

    const result = await userService.createUserIntoDB(payload);

    if (!result) {
      throw new Error("User not created successfully");
    }

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = userService.getAllUserFromDB();
    if (!result) {
      throw new Error("Didn't Find Any User");
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get All User successfully',
      data: result
    });
  } catch (error) {
    next(error)
  }
}



const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const id = req.user.userId;
    const payload = req.body;
    const files = req.files as {
      businessLicense?: { filename: string }[];
      driveingLicense?: { filename: string }[];
    };


    if (files?.businessLicense && files.businessLicense[0]?.filename) {
      payload.businessLicense = `/uploads/users/${files.businessLicense[0].filename}`;
    }

    if (files?.driveingLicense && files.driveingLicense[0]?.filename) {
      payload.driveingLicense = `/uploads/users/${files.driveingLicense[0].filename}`;
    }
    const result = await userService.updateUserFromDB(id, payload);
    if (!result) {
      throw new Error("Update Unsuccessful");
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Update User successfully',
      data: result
    });
  } catch (error) {
    return error
  }
}

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Email and password are required!');
    }

    // Call the login service to authenticate the user
    const accessToken = await userService.loginUser({ email, password });
    if (!accessToken) {

      return new Error("Access Token Not Genareted");
    }
    const user = await UserModel.find({ email });
    if (!user) {
      return new Error("user Not Found");
    }
    // Send the response only if the token is generated
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User logged in successfully',
      token: accessToken,
      data: user
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
});



const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('authToken', { httpOnly: true, secure: true });
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error)
  }
}

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await userService.blockUserfromDB(id)
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User Blocked successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}
const suspendUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await userService.suspendUserfromDB(id)
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User Blocked successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const payload = req.body;
    const result = await userService.forgetPasswordFromDB(payload, email)
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "password Update successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const result = await userService.resetPasswordFromDB(payload, id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "password Reset successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const makeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const branchID = new mongoose.Types.ObjectId(id);

    const result = await userService.makeAdminFromDB(branchID ,payload)
    if (!result) {
      throw new Error("Make Admin Failed");
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Make Admin successfully Done",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  loginUser,
  getAllUser,
  updateUser,
  logout,
  blockUser,
  suspendUser,
  forgetPassword,
  resetPassword,
  makeAdmin
};
