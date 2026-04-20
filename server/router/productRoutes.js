import express from 'express';
import upload from '../middlewares/upload.js'
import { addProduct, deleteProduct, getAllProduct, getProduct, randomProduct } from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const productRouter = express.Router()



productRouter.post("/addProduct", upload.single("img"), authMiddleware, addProduct)
productRouter.get("/getProduct", authMiddleware, getProduct)
productRouter.delete("/deleteProduct/:id", authMiddleware, deleteProduct);
productRouter.get('/randomProduct', authMiddleware, randomProduct)
productRouter.get('/getAllProducts', authMiddleware, getAllProduct)
export default productRouter