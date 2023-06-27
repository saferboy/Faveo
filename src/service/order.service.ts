import { CreateOrderInput, ProductInput } from "@model/order.dto";
import { OrderStatus, PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export default class OrderService {

    static create(createInput: CreateOrderInput) {
        return client.order.create({
            data: {
                address: createInput.address,
                name: createInput.name,
                phone: createInput.phone,
                purchaseType: createInput.purchaseType,
                status: "pending",
                comment: createInput.comment
            }
        })
    }

    static updateStatus(id: number, status: OrderStatus) {
        return client.order.update({
            where: {
                id
            },
            data: {
                status
            }
        })
    }

    static updatePaymentUrl(id: number, paymentUrl: string) {
        return client.order.update({
            data: {
                paymentUrl
            },
            where: {
                id
            }
        })
    }

    static addOrderItem(orderId: number, input: ProductInput) {
        return client.orderItem.create({
            data: {
                product: {
                    connect: {
                        id: input.productId
                    }
                },
                order: {
                    connect: {
                        id: orderId
                    }
                },
                quantity: input.quantity
            },
            include: {
                product: true 
            }
        })
    }

}



