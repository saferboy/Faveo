import { Router } from "express";

import getAppInfo from "@controller/app-info/getAppInfo";
import updateAppInfo from "@controller/app-info/updateAppInfo";


import permission from "@middleware/permission";

const router = Router()

    .get('/', permission('user'), getAppInfo)
    .put('/', permission('admin'), updateAppInfo )

export default router


