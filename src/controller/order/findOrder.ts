import { Request, NextFunction, Response } from "express";
import OrderService from "@service/order.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const order = await OrderService.findOrder(id)

        if (!order) {
            return res.status(404).json({
                message: `Order not found this ${id}`
            })
        }

        const formatOrder = {
            id: order?.id,
            products: order?.OrderItem.map((orderItem) => ({
                id: orderItem.product.id,
                name: orderItem.product.name,
                price: orderItem.product.price,
                image: orderItem.product.image,
                category: {
                    id: orderItem.product.category.id,
                    name: orderItem.product.category.name,
                    icon: orderItem.product.category.icon
                },
                quantity: orderItem.quantity
            })),
            date: order?.date,
            address: order?.address,
            phone: order?.phone,
            name: order?.name,
            purchaseType: order?.purchaseType,
            paymentUrl: order?.paymentUrl,
            status: order?.status,
            comment: order?.comment
        }

        return res.status(201).json({
            message: `Order by id ${id}`,
            order: formatOrder
        })

    } catch (error) {
        next(error)
    }
}