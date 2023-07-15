import { Request, Response, NextFunction } from "express";
import OrderService from "@service/order.service";
import { OrderStatus } from "@prisma/client";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id

        const find = await OrderService.findOrder(id)

        if (!find) {
            return res.status(404).json({
                massage: `Order not found by id: ${id}`
            })
        }

        const status = req.body.status as OrderStatus

        const comment = req.body.comment

        const updateStatus = await OrderService.updateStatus(id, status, comment)

        return res.status(201).json({
            messsage: 'Order declined',
            order: {
                id: updateStatus.id,
                products: updateStatus.OrderItem.map((product) => ({
                    id: product.product.id,
                    quantity: product.quantity
                })),
                date: updateStatus.date,
                address: updateStatus.address,
                phone: updateStatus.phone,
                purchasetype: updateStatus.purchaseType,
                paymenturl: updateStatus.paymentUrl,
                status: updateStatus.status,
                comment: updateStatus.comment
            }
        })

    } catch (error) {
        next(error)
    }
}