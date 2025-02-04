import express from "express";
import { priceingController } from "./priceing.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";      
import { shippingValidation } from "./priceing.validation";

const router = express.Router();

router.post(
    '/create-priceing',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    validateRequest(shippingValidation.shippingValidationSchema),
    priceingController.createPriceing
)

router.get(
    '/read-priceing',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    priceingController.readAllPriceing
)

router.patch(
    '/update-priceing/:id',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    validateRequest(shippingValidation.shippingValidationSchema),
    priceingController.updatePriceing
)
router.delete(
    '/delete-priceing/:id',
    auth(USER_ROLE.admin, USER_ROLE.sub_admin),
    priceingController.deletePriceing
)


export const priceingRoutes = router;