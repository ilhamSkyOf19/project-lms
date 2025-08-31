import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { SignUpRequestType, SignUpResponseType, UserModel } from "../model/auth-model";
import type { SignInRequestType, SignInResponse } from "../model/login-model";
import type { ResponseService } from "../types";

export class AuthService {
    // sign up 
    static async signUp(data: SignUpRequestType): Promise<ResponseService<SignUpResponseType>> {
        try {
            const response = await AXIOS.post('/sign-up', data, {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.data)

            return {
                success: true,
                data: response.data
            }


        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data
            }
            console.log(error)
            return {
                success: false,
                message: 'something went wrong'
            }
        }
    }

    // sign in 
    static async signIn(data: SignInRequestType): Promise<ResponseService<SignInResponse>> {
        try {
            const response = await AXIOS.post('/sign-in', data, {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.data)

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data
            }
            console.log(error)
            return {
                success: false,
                message: 'something went wrong'
            }
        }
    }

    // get auth user 
    static async getAuthUser(): Promise<ResponseService<UserModel>> {
        try {
            // get auth user
            const response = await AXIOS.get('/auth', {
                headers: { 'Content-Type': 'application/json' }
            })

            // cek
            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data
            }
            console.log(error)
            return {
                success: false,
                message: 'something went wrong'
            }
        }
    }
}