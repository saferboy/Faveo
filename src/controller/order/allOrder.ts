import { Request, Response, NextFunction } from "express";
import OrderService from "@service/order.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const orders = await OrderService.allOrder()

        const mapped = orders.map(order => {
            return {
                id: order.id,
                products: order.OrderItem.map((orderItem) => ({
                    id: orderItem.product.id,
                    categoryId: orderItem.product.category.id,
                })),
                date: order.date,
                status: order.status,
            }
        })

        return res.status(201).json({
            message: 'Retrive all orders',
            orders: mapped
        })


    } catch (error) {
        next(error)
    }
}