import { Request, Response } from 'express'
import { LoginRequestType, type LoginResponseType } from '../model/login-model';
import { LoginService } from '../service/login.service';
import { ResponseService } from '../utils/type';





export class LoginController {
    // login 
    static async create(req: Request<{}, {}, LoginRequestType>, res: Response<ResponseService<{ message: string, role: 'manager' | 'student' }>>) {
        try {
            // get parameter 
            const body = req.body;

            // login service 
            const login = await LoginService.login(body);

            if (!login.success) {
                return res.status(400).json({
                    success: false,
                    message: login.message
                })
            }

            res.cookie("token", login.data.token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })




            return res.status(200).json({
                success: true,
                data: {
                    message: "Login Success",
                    role: login.data.role
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}