import express from 'express';

const router = express.Router();

router.get('/orders', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: "Welcome to Orders"
  })
})

export default router;