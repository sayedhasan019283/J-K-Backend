import express from 'express';
import { cabinetryController } from './cabinetry.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

const UPLOADS_FOLDER_USER_DOCUMENTS = 'uploads/cabinetry';
const upload = fileUploadHandler(UPLOADS_FOLDER_USER_DOCUMENTS);

router.post(
    '/create-cabinetry/:id',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    // validateRequest(cabinetryValidation.cabinetryValidationSchema),
    upload.single('imageUrl'),
    cabinetryController.createCabinetry
)

router.get(
    '/read-cabinetry',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    cabinetryController.readCabinetry
)

router.patch(
    '/update-cabinetry/:id',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    // validateRequest(cabinetryValidation.cabinetryValidationSchema),
    upload.single('imageUrl'),
    cabinetryController.updateCabinetry
)

router.delete(
    '/delete-cabinetry/:id',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    cabinetryController.deleteCabinetry
)
export const cabinetryRoute = router;