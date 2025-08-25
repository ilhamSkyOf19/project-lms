import express, { Request, Response } from "express";
import transactionSchema from "../schema/transactionSchema";

interface MidtransWebhook {
    transaction_time: string;
    transaction_status: string;
    transaction_id: string;
    order_id: string;
    status_code: string;
    gross_amount: string;
    signature_key: string;
    payment_type: string;
    fraud_status?: string;
    [key: string]: any;
}


const handlePayment = async (req: Request<{}, {}, MidtransWebhook>, res: Response<{ message: string }>) => {
    try {
        const body = req.body

        const order_id = body.order_id


        switch (body.transaction_status) {
            case "capture":
            case "settlement":
                await transactionSchema.findByIdAndUpdate(order_id, { status: "success" });
                break;
            case "deny":
            case "cancel":
            case "expire":
            case "failure":
                await transactionSchema.findByIdAndUpdate(order_id, { status: "failed" });
                break;
            default:
                break;
        }

        return res.json({ message: "success" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }
}


export default handlePayment 
