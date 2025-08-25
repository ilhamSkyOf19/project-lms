import { Request, Response } from "express";
import { UserRequestType } from "../model/user-model";
import bcrypt from "bcrypt"
import { UserService } from "../service/user.service";

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
}