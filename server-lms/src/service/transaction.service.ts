import transactionSchema from "../schema/transactionSchema";


type MidtransResponse = {
    redirect_url: string
}

export class TransactionService {
    static async pay(req: { user: string, price: number, email: string }): Promise<MidtransResponse> {
        const midtransUrl: string = process.env.MIDTRANS_URL || "";
        const midtransAuthString: string = process.env.MIDTRANS_AUTH_STRING || "";
        const successUrl: string = process.env.ORIGIN || "";

        const transaction = new transactionSchema({
            user: req.user,
            price: req.price,
            status: 'pending'
        })

        const response = await fetch(midtransUrl, {
            method: "POST",
            body: JSON.stringify({
                transaction_details: {
                    order_id: transaction._id,
                    gross_amount: transaction.price
                },
                credit_card: {
                    "secure": true
                },
                customer_details: {
                    email: req.email,
                },
                callbacks: {
                    finish: `${successUrl}/manager`
                }
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${midtransAuthString}`
            }
        })

        // save transaction
        await transaction.save();

        // return response transaction
        return response.json() as Promise<MidtransResponse>;
    }
}