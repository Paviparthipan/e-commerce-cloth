import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { actionOrder, createOrder, getMyOrder, getOrder } from '../controllers/orderController.js';
const orderRoutes = express.Router()


orderRoutes.post('/createOrder', authMiddleware, createOrder)
orderRoutes.get('/getMyOrder', authMiddleware, getMyOrder)
orderRoutes.get('/getOrder', getOrder)
orderRoutes.post('/actionOrder', authMiddleware, actionOrder)


export default orderRoutes
