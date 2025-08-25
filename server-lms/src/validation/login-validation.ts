import z, { email, ZodType } from 'zod';
import { LoginRequestType } from '../model/login-model';


export class LoginValidation {
    // login
    static readonly LOGIN = z.object({
        email: z.email(),
        password: z.string()
    }).strict() satisfies ZodType<LoginRequestType>
}

