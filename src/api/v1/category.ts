import { Router } from "express";
import { upload } from "@middleware/upload";

import createCategory from "@controller/category/create-category";
import allCategory from "@controller/category/all-category";
import findCategory from "@controller/category/findCategoryById";
import updateCategory from "@controller/category/update-category";
import deleteCategory from "@controller/category/delete-category";

import permission from "@middleware/permission";

const router = Router()

    .post('/', upload.single('file'), permission('admin'), createCategory)
    .get('/', permission('user'), allCategory)
    .get('/:id', permission('admin'), findCategory)
    .put('/:id', permission('admin'), upload.single('file'), updateCategory)
    .delete('/:id', permission('admin'), deleteCategory)

export default router


