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

            // mid transaction
            // hash password
            const hashPassword = await bcrypt.hash(body.password, 10);
            const response = await UserService.create({ ...body, password: hashPassword });



            return res.status(201).json({
                message: "User created successfully",
                data: {
                    midtrans_payment_url: response
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}