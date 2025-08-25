import z, { ZodType } from 'zod';
import type { SignUpRequestType } from '../model/auth-model';
import type { SignInRequestType } from '../model/login-model';


export class AuthValidation {
    // sign up 
    static readonly signUp = z.object({
        name: z.string().min(3, 'Nama waajib diisi'),
        photo: z.string().optional().default('default.jpg'),
        email: z.email('Email tidak valid'),
        password: z.string().min(6, 'Password minimal 6 karakter'),
        role: z.enum(['manager', 'student']).optional().default('manager')
    }).strict() satisfies ZodType<SignUpRequestType>;

    // sign in 
    static readonly signIn = z.object({
        email: z.email('Email tidak valid'),
        password: z.string().min(6, 'Password minimal 6 karakter')
    }).strict() satisfies ZodType<SignInRequestType>;
}