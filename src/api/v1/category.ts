import { Router } from "express";
import { upload } from "@middleware/upload";

import createCategory from "@controller/category/create-category";
import allCategory from "@controller/category/all-category";
import findCategory from "@controller/category/findCategoryById";


import permission from "@middleware/permission";

const router = Router()

    .post('/', upload.single('file'), permission('admin'), createCategory)
    .get('/', permission('user'), allCategory)
    .get('/:id',permission('admin'), findCategory)

export default router
