import { Request, Response, NextFunction } from "express";
import OrderService from "@service/order.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const orders = await OrderService.allOrder()

        const mapped = orders.map(order => {
            return {
                id: order.id,
                products: order.OrderItem.map((orderItem) => ({
                    id: orderItem.product.id
                })),
                date: order.date,
                purchaseType: order.purchaseType,
                status: order.status,
                comment: order.comment
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