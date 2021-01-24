import express from 'express';
import ordersController from '../modules/orders/ordersController';
import validations from '../middlewares/validations';
import tokenAuthentication from '../middlewares/auth';

const router = express.Router();

router.post(
  '/orders',
  tokenAuthentication,
  validations.createOrderInputValidation,
  ordersController.create
);

router.put(
  '/orders/:orderId',
  tokenAuthentication,
  validations.updateOrderInputValidation,
  ordersController.update
);

router.get(
  '/orders',
  tokenAuthentication,
  ordersController.getAll
);

router.get(
  '/orders/:orderId',
  tokenAuthentication,
  ordersController.getOne
);

export default router;
