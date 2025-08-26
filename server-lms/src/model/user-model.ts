import { Request } from "express";

export type UserRequestType = {
    name: string,
    photo: string,
    email: string,
    password: string
    role: 'manager' | 'student'
}

export type UserResponseType = {
    name: string,
    photo: string,
    email: string,
    role: 'manager' | 'student'
}

export const toUserResponse = (user: UserResponseType): UserResponseType => ({
    name: user.name,
    photo: user.photo,
    email: user.email,
    role: user.role
})

export type AuthRequest = Request & {
    data: {
        id: string,
        name: string,
        email: string,
        role: 'manager' | 'student'
    }
}
