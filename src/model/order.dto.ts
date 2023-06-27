export interface CreateOrderInput {
    products: ProductInput[]
    address: string
    phone: string
    name: string
    purchaseType: string
    comment: string
}

export interface ProductInput {
    productId: number
    quantity: number
}

export interface OrderResponse {
    id: number,
    products: {
        id: number,
        name: string,
        price: number,
        quantity: number
    }[],
    date: Date,
    total: {
        amount: number,
        quantity: number
    },
    address: string,
    phone: string,
    name: string,
    pruchaseType: string,
    // only for payment systems, if payment methods is cash paymentUrl = null
    paymentUrl: string,
    status: string, // pending for payment. status = ['pending', 'success', 'errored', 'declined']
    comment: string
}