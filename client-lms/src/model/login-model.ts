export type SignInRequestType = {
    email: string,
    password: string,
}


export type SignInResponse = {
    success: boolean,
    message: string,
    role: 'manager' | 'student',
}

