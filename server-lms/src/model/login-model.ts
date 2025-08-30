export type LoginRequestType = {
    email: string;
    password: string;
}

export type LoginResponseType = {
    token: string,
    name: string,
    email: string
    role: 'manager' | 'student',
}


// auth response 
export type AuthResponseType = {
    id: string,
    name: string,
    email: string,
    role: 'manager' | 'student',
}


// to response auth

export const toAuthResponse = (user: AuthResponseType): AuthResponseType => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
});

export const toLoginResponse = (user: LoginResponseType): LoginResponseType => ({
    token: user.token,
    name: user.name,
    email: user.email,
    role: user.role
})




