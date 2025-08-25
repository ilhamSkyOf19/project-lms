import { LoginRequestType, LoginResponseType } from "../model/login-model";
import transactionSchema from "../schema/transactionSchema";
import userSchema from "../schema/userSchema";
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ResponseService } from "../utils/type";


export class LoginService {
    // login 
    static async login(req: LoginRequestType): Promise<ResponseService<LoginResponseType>> {

        // find email 
        const findUser = await userSchema.findOne().where('email').equals(req.email);

        if (!findUser) return {
            success: false,
            message: "Email / Password is wrong"
        };


        //  cek password 
        const passwordCompare = await bcyrpt.compare(req.password, findUser.password);


        if (!passwordCompare) return {
            success: false,
            message: 'Email / Password is wrong'
        };


        // cek transaction 
        const isValidUser = await transactionSchema.findOne({
            user: findUser.id,
            status: 'success'
        });

        if (findUser.role !== 'student' && !isValidUser) {
            return {
                success: false,
                message: "User not verified"
            }
        }

        // token 
        const token: string = jwt.sign(
            {
                data: {
                    id: findUser.id
                } as { id: string }
            },
            process.env.SECRET_KEY_JWT || "",
            { expiresIn: '1d' }
        )

        return {
            success: true,
            data: {
                token,
                name: findUser.name,
                email: findUser.email,
                role: findUser.role
            }
        }
    }
}