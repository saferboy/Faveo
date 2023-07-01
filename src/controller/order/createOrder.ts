import { Request, Response, NextFunction } from "express";
import { CreateOrderInput, OrderResponse } from '@model/order.dto'
import PaymentService from '@service/payment.service'
import { CreateBillInput } from "@model/bill";
import OrderService from "@service/order.service";


export default async (req: Request, res: Response) => {

    const input: CreateOrderInput = req.body
    const order = await OrderService.create(input)

    const products: {
        id: number,
        name: string,
        price: number,
        quantity: number
    }[] = []

    const total = {
        amount: 0,
        quantity: 0
    }

    for (const product of input.products) {
        const result = await OrderService.addOrderItem(order.id, product)

        products.push({
            id: result.productId,
            name: result.product.name,
            price: 9.11,
            quantity: result.quantity
        })

        total.amount += result.product.price
        total.quantity += result.quantity
    }

    const createBillInput: CreateBillInput = {
        amount: total.amount,
        comment: input.comment,
        orderId: order.id
    }

    const bill = await PaymentService.createBill(createBillInput)

    await OrderService.updatePaymentUrl(order.id, bill.paymentUrl)

    const response: OrderResponse = {
        id: order.id,
        products: products,
        date: order.date,
        total: total,
        address: order.address,
        phone: order.phone,
        name: order.name,
        pruchaseType: order.purchaseType,
        paymentUrl: bill.paymentUrl,
        status: order.status,
        comment: order.comment
    }

    res.json({
        message: 'Order created',
        order: response
    })

}