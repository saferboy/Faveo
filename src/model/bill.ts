export interface CreateBillInput {
    orderId: number
    amount: number
    comment: string
}

export interface BillResponse {
    billId: string,
    orderId: number,
    amount: number,
    date: Date,
    paymentUrl: string
}