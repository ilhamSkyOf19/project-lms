import { Request } from "express";

export type UserRequestType = {
    name: string,
    photo: string,
    email: string,
    password: string
    role: 'manager' | 'student',
    manager?: {
        id: string
    },
    course?: {
        id: string
    }
}

export type UserResponseType = {
    name: string,
    photo: string,
    email: string,
    role: 'manager' | 'student',
    manager?: {
        id: string
    },
    course?: {
        id: string
    }
}

export const toUserResponse = (user: UserResponseType): UserResponseType => ({
    name: user.name,
    photo: user.photo,
    email: user.email,
    role: user.role,
    ...(user.manager && { manager: user.manager }),
    ...(user.course && { course: user.course }),
})


type Params = {
    id: string;
};

interface TokenData {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthRequest extends Request<Params, any, any, any> {
    data?: TokenData;
}