import { Router } from "express";
import { upload } from "@middleware/upload";
import permission from "@middleware/permission";

import createProduct from "@controller/product/createProduct";
import allProducts from "@controller/product/allProducts";

const router = Router()

    .post('/:id', permission('admin'), upload.single('file'), createProduct)
    .get('/', permission('user'), allProducts)

export default router


