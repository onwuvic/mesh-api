import express from 'express';
import ordersController from '../modules/orders/ordersController';

const router = express.Router();

router.post('/orders', ordersController.create);
router.put('/orders/:id', ordersController.update);

export default router;