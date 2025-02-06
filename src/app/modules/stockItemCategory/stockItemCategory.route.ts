import express from 'express'
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { stockItemCategoryontroller } from './stockItemCategory.controller';
import validateRequest from '../../middlewares/validateRequest';
import { validateStockItemCategory } from './stockItemCategory.validation';

const router = express.Router();

router.post(
    '/create-stock-caregory/:stockItemId',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    validateRequest(validateStockItemCategory.stockItemCategorySchema),
    stockItemCategoryontroller.createstockItemCategory
)

router.get(
    '/read-all-stock-category',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    stockItemCategoryontroller.readStockItemCategory
)

router.get(
    '/read-single-stock-category/:stockItemId',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    stockItemCategoryontroller.readStockItemCategoryById
)

router.delete(
    '/read-single-stock-category/:stockItemId',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    stockItemCategoryontroller.deleteStockItemCategory
)

router.patch(
    '/update-single-stock-category',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    validateRequest(validateStockItemCategory.stockItemCategorySchema),
    stockItemCategoryontroller.updateStockItemCategory
)

export const stockItemCategoryRoute = router;  
