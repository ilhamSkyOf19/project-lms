import mongoose, { Document } from "mongoose";



// type use userSchema 
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'manager' | 'student';
    photo: string,
    createdAt: Date;
    updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['manager', 'student'],
        default: 'manager'
    }
}, {
    timestamps: true,
})


export default mongoose.model<IUser>("User", UserSchema);