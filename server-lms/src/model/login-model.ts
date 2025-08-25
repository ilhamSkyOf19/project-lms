export type LoginRequestType = {
    email: string;
    password: string;
}

export type LoginResponseType = {
    token: string,
    name: string,
    email: string
    role: string,
}


export const toLoginResponse = (user: LoginResponseType): LoginResponseType => ({
    token: user.token,
    name: user.name,
    email: user.email,
    role: user.role
})




