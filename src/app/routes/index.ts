import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { openRoutes } from '../modules/open/open.route';
import { codeRoutes } from '../modules/vaCode/vaCode.route';

import { messageRoutes } from '../modules/chat/chat.route';
import { paymentRoute } from '../modules/payment/payment.route';
import { createBranchRoutes } from '../modules/createBranch/createBranch.route';
const router = Router();

const moduleRoutes = [
 
  {
    path: '/',
    route: openRoutes,
  },
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/reset-password',
    route: codeRoutes,
  },

  {
    path: '/chat',
    route: messageRoutes,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/branch',
    route: createBranchRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
