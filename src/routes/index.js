import express from 'express';
import ordersController from '../modules/orders/ordersController';
import validations from '../middlewares/validations';

const router = express.Router();

router.post('/orders', validations.createOrderInputValidation, ordersController.create);
router.put('/orders/:id', ordersController.update);

export default router;