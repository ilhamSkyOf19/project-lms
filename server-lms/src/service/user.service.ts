import { toUserResponse, UserRequestType, UserResponseType } from "../model/user-model";
import UserSchema from "../schema/userSchema";
import { TransactionService } from "./transaction.service";

type MidtransResponse = {
    redirect_url: string
}

export class UserService {
    // create 
    static async create(req: UserRequestType): Promise<MidtransResponse> {
        const user = new UserSchema({
            name: req.name,
            photo: req.photo,
            email: req.email,
            password: req.password,
            role: req.role
        });


        const midtrans = await TransactionService.pay({ user: user.id, price: 100000, email: user.email });
        await user.save();

        return midtrans;

    }
}