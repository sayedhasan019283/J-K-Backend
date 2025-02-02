import express from 'express';
import { stockItemController } from './stockItem.controller';
import validateRequest from '../../middlewares/validateRequest';
import { stockItemValidation } from './stockItem.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
    '/create-title',
    auth(USER_ROLE.super_admin),
    validateRequest(stockItemValidation.TitleValidation),
    stockItemController.createTitle,
);
router.get(
    '/read-title',
    auth(USER_ROLE.super_admin),
    stockItemController.readTitle,
);
router.patch(
    '/update-title/:id',
    auth(USER_ROLE.super_admin),
    validateRequest(stockItemValidation.TitleValidation),
    stockItemController.updateTitle,
);
router.delete(
    '/delete-title/:id',
    auth(USER_ROLE.super_admin),
    stockItemController.deleteTitle,
);

export const stockItemRoutes = router;