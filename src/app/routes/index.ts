import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { openRoutes } from '../modules/open/open.route';
import { codeRoutes } from '../modules/vaCode/vaCode.route';
import { messageRoutes } from '../modules/chat/chat.route';
import { paymentRoute } from '../modules/payment/payment.route';
import { createBranchRoutes } from '../modules/createBranch/createBranch.route';
import { stockItemRoutes } from '../modules/stockItem/stockItem.route';
import { partsRoutes } from '../modules/parts/parts.routes';
import { categoryRoutes } from '../modules/category/category.route';
import { cabinetryRoute } from '../modules/cabinetry/cabinetry.route';
import { priceingRoutes } from '../modules/priceing/priceing.route';
import { stockItemCategoryRoute } from '../modules/stockItemCategory/stockItemCategory.route';
import { orderRoutes } from '../modules/order/order.route';
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
  },
  {
    path: '/stock-item',
    route: stockItemRoutes,
  },
  {
    path: '/parts',
    route: partsRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/cabinetry',
    route: cabinetryRoute,
  },
  {
    path: '/priceing',
    route: priceingRoutes,
  },
  {
    path: '/stock-item-category',
    route: stockItemCategoryRoute,
  },
  {
    path: '/order',
    route: orderRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
