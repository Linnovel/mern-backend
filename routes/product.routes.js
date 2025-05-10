import express from 'express';

import { createProducto, deleteProduct, getProducts, updateProduct } from '../controllers/product.controler.js';

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProducto)

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
