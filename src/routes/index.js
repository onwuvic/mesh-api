import express from 'express';
import ordersController from '../modules/orders/ordersController';

const router = express.Router();

router.post('/orders', ordersController.create);

export default router;