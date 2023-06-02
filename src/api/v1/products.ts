import { Router } from "express";
import { upload } from "@middleware/upload";
import permission from "@middleware/permission";

import createProduct from "@controller/product/createProduct";
import allProducts from "@controller/product/allProducts";
import findPrdctByCtgId from "@controller/product/getProductByCategoryId";
import findProductById from "@controller/product/findProductById";
import updateProduct from "@controller/product/updateProduct";
import removeProduct from "@controller/product/deleteProduct";

const router = Router()

    .post('/:id', permission('admin'), upload.single('file'), createProduct)
    .get('/', permission('user'), allProducts)
    .get('/:category_id', permission('user'), findPrdctByCtgId)
    .get('/:id', permission('admin'), findProductById)
    .put('/:id', permission('admin'), upload.single('file'), updateProduct)
    .delete('/:id', permission('admin'), removeProduct)

export default router


