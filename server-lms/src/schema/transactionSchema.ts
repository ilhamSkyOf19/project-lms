import mongoose, { Document, Types } from "mongoose";

export interface ITransaction extends Document {
    user: Types.ObjectId;
    price: number;
    status: 'pending' | 'success' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema = new mongoose.Schema<ITransaction>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    }
}, {
    timestamps: true
});


export default mongoose.model<ITransaction>("Transaction", TransactionSchema);