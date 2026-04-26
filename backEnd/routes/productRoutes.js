import express from "express";
import { test } from '../controllers/productController.js';

const router = express.Router()


router.get('/', test)

export default router;