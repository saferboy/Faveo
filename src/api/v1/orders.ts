import { Router } from "express";
import { createValidator } from "express-joi-validation"
import { forFindOrder, updateStatus } from "../../joi.schema";


import permission from "@middleware/permission";

import createOrder from "@controller/order/createOrder";
import findOrder from "@controller/order/findOrder";
import allOrder from "@controller/order/allOrder";
import updateOrderStatus from "@controller/order/updateOrderStatus";


const validator = createValidator()


const router = Router()

    .post('/', permission('user'), createOrder)
    .get('/:id', validator.params(forFindOrder), permission('admin'), findOrder)
    .get('/', permission('admin'), allOrder)
    .put('/:id/status', permission('admin'),  updateOrderStatus)

export default router


