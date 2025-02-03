import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";


const router = express.Router()

// Define the upload folder
const UPLOADS_FOLDER_USER_DOCUMENTS = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER_USER_DOCUMENTS)

router.patch(
  '/update',
  auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
  validateRequest(userValidation.UpdateUserSchema),
  upload.fields([
    {
      name: "driveingLicense",
      maxCount: 1
    },
    {
      name: "businessLicense",
      maxCount:1
    }
  ]),
  userController.updateUser
)
router.post(
  '/register',
  // validateRequest(userValidation.UserSchema),
  upload.fields([
    {
      name: "driveingLicense",
      maxCount: 1
    },
    {
      name: "businessLicense",
      maxCount:1
    }
  ]),
  userController.createUser
)
router.get(
  '/get-all-user',
  auth( USER_ROLE.admin, USER_ROLE.super_admin),
  userController.getAllUser
)

router.post(
  '/login',
  validateRequest(userValidation.LoginValidationSchema),
  userController.loginUser,
);

router.post(
  '/logout',
  userController.logout,
);
router.patch(
  '/block/:id',
  auth( USER_ROLE.admin, USER_ROLE.super_admin),
  userController.blockUser,
);
router.patch(
  '/suspend/:id',
  auth( USER_ROLE.admin, USER_ROLE.super_admin),
  userController.suspendUser,
);
router.post(
  '/change-passs/:email',
  validateRequest(userValidation.ForgetPasswordValidationSchema),
  userController.forgetPassword,
);
router.post(
  '/reset-passs/:id',
  auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin, USER_ROLE.sub_admin),
  validateRequest(userValidation.ResetPasswordValidationSchema),
  userController.resetPassword,
);
router.post(
  '/make-branch&sub-admin/:id', 
  auth(USER_ROLE.super_admin),
  // validateRequest(userValidation.AdminCreateAdminSchema),
  userController.makeAdmin,
);

router.get(
  '/read-user/:id',
  auth( USER_ROLE.admin, USER_ROLE.super_admin),
  userController.getSingleUser
)

router.get(
  '/verified-user',
  auth( USER_ROLE.admin, USER_ROLE.super_admin),
  userController.verifiedUser
)







export const userRoutes = router;