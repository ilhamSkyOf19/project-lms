import AXIOS from "../lib/axios";
import type { SignUpRequestType, SignUpResponseType } from "../model/auth-model";

export class AuthService {
    // sign up 
    static async signUp(data: SignUpRequestType): Promise<SignUpResponseType> {
        return AXIOS.post('/sign-up', data, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.data)
            .then(data => data.data);
    }
}