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