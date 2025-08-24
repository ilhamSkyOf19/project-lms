import zod, { ZodType } from "zod";
import { UserRequestType } from "../model/user-model";
export class UserValidation {
    // create 
    static readonly CREATE = zod.object({
        name: zod.string().min(3),
        photo: zod.string(),
        email: zod.email(),
        password: zod.string(),
        role: zod.enum(['manager', 'student'])
    }).strict() satisfies ZodType<UserRequestType>
}