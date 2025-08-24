import z, { ZodType } from 'zod';
import type { SignUpRequestType } from '../model/auth-model';


export class AuthValidation {
    // sign up 
    static readonly signUp = z.object({
        name: z.string().min(3, 'Nama waajib diisi'),
        email: z.email('Email tidak valid'),
        password: z.string().min(6, 'Password minimal 6 karakter')
    }).strict() satisfies ZodType<SignUpRequestType>;
}