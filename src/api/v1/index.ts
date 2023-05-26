import { Router } from "express";

// v1 imports
import authRoutes from "./auth"
import usersRoutes from "./users"
import appInfo from "./appInfo"
import category from "./category"
// import products  from "./products"
// import orders   from "./orders"

const router = Router()

    .use('/auth', authRoutes)
    .use('/users', usersRoutes)
    .use('/info', appInfo)
    .use('/categories', category)
// .use('/products', products)
// .use('/orders', orders)

export default router