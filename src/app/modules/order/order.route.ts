import express from 'express';
import { orderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { orderValidation } from './order.validation';

const router = express.Router();

router.post(
    '/create-order',
    auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
    validateRequest(orderValidation.shippingAddressSchema),
    orderController.createOrder
)

router.get(
    '/read-order',
    auth( USER_ROLE.admin, USER_ROLE.sub_admin),
    orderController.readOrder
)

router.get(
    '/read-order/:id',
    auth(USER_ROLE.user),
    orderController.readOneData
)

router.delete(
    '/delete-order/:id',
    auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
    orderController.deleteOrder
)   

export const orderRoutes = router;