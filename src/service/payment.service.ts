import { nanoid } from 'nanoid'
import { BillResponse, CreateBillInput } from '@model/bill'

export default class PaymentService {

    static async createBill(input: CreateBillInput) {
        const bill: BillResponse = {
            billId: nanoid(),
            orderId: input.orderId,
            amount: input.amount,
            date: new Date(),
            paymentUrl: "https://fakepayment.com/bill/" + nanoid(6)
        }

        return bill
    }

}