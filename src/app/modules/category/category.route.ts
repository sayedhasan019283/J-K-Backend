import express from 'express';
import { categoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { categoryValidation } from './category.validation';


const router = express.Router();

router.post(
    '/create-category',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    // validateRequest(categoryValidation.categoryValidationSchema),
    categoryController.createCategory
)

router.get(
    '/read-category',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    categoryController.readAllCategory
)

router.patch(
    '/update-category/:id',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    // validateRequest(categoryValidation.categoryValidationSchema),
    categoryController.updateCategory
)
router.delete(
    '/delete-category/:id',
    auth(USER_ROLE.sub_admin, USER_ROLE.admin),
    categoryController.deleteCategory
)
export const categoryRoutes = router;
