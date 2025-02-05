import express from "express";
import { partsController } from "./parts.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import fileUploadHandler from "../../middlewares/fileUploadHandler";

const router = express.Router();    

// Define the upload folder
const UPLOADS_FOLDER_USER_DOCUMENTS = 'uploads/parts';
const upload = fileUploadHandler(UPLOADS_FOLDER_USER_DOCUMENTS)

router.post(
    '/create-parts/:id',
    auth( USER_ROLE.admin),
    // validateRequest(partValidation.CreatePartSchema),
    upload.single('image'),
    partsController.createPart
)
router.get(
    '/read-parts',
    auth( USER_ROLE.admin, USER_ROLE.sub_admin),
    partsController.getAllPart
)    
router.get(
    '/read-parts-without-login',
    partsController.readPartWithoutLogin
)    

router.patch(
    '/update-parts/:id',
    auth( USER_ROLE.admin),
    // validateRequest(partValidation.UpdatePartSchema),
    upload.single('image'),
    partsController.updatepart
)
router.delete(
    '/delete-parts/:id',
    auth( USER_ROLE.admin ),
    partsController.deletepart         
)


export const partsRoutes = router