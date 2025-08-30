import { Request, Response } from "express";
import { UserRequestType } from "../model/user-model";
import bcrypt from "bcrypt"
import { UserService } from "../service/user.service";
import { AuthRequest } from "../middlewares/tokenMiddleware";
import { AuthResponseType } from "../model/login-model";

export class AuthController {
    // create
    static async create(req: Request<{}, {}, UserRequestType>, res: Response) {
        try {
            // get body
            const body = req.body;

            // hash password
            const hashPassword = await bcrypt.hash(body.password, 10);
            // response 
            const response = await UserService.create({ ...body, password: hashPassword });



            return res.status(201).json({
                message: "User created successfully",
                data: {
                    midtrans_payment_url: response
                }
            });
        } catch (error: any) {
            console.log(error);
            // error email
            if (error.code === 11000 && error.keyValue?.email) return res.status(400).json({ message: "Email already exists" });

            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }

    // get auth 
    static async getAuth(req: AuthRequest, res: Response<AuthResponseType | { success: boolean, message: string }>) {
        try {
            const user = req.data;

            if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });

            return res.status(200).json({
                success: true,
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}