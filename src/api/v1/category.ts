import { Router } from "express";
import { upload } from "@middleware/upload";

import createCategory from "@controller/category/create-category";
import permission from "@middleware/permission";

const router = Router()

    .post('/',upload.single('file'),permission('admin'), createCategory)

export default router

