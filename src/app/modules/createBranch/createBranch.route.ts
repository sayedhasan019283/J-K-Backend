import express from 'express';
import { createBranchController } from './createBranch.controller';
import { branchValidation } from './createBranch.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
    '/create-branch',
    auth(USER_ROLE.super_admin),
    validateRequest(branchValidation.branchValidationSchema),
    createBranchController.createBranch
)
router.get(
    '/read-branch',
    auth(USER_ROLE.super_admin),
    createBranchController.readBranch
)

router.patch(
    '/update-branch/:id',
    auth(USER_ROLE.super_admin),
    validateRequest(branchValidation.branchValidationSchema),
    createBranchController.updateBranch
)

router.delete(
    '/delete-branch/:id',
    auth(USER_ROLE.super_admin),
    createBranchController.deleteBranch
)

router.get(
    '/single-branch/:id',
    auth(USER_ROLE.super_admin),
    createBranchController.getSingleBranch
)

export const createBranchRoutes = router;