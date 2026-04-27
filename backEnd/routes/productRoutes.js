import express from "express";
import { addProduct, getProducts, deleteProduct } from '../controllers/productController.js';

const router = express.Router()


router.post('/addProduct', addProduct)
router.get('/getProducts', getProducts)
router.delete('/deleteProduct/:id', deleteProduct)


export default router;