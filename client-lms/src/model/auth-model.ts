export type SignUpRequestType = {
    name: string;
    photo?: string;
    email: string;
    password: string;
    role?: 'manager' | 'student';
}


export type MidtransResponse = {
    redirect_url: string
    token: string
}

export type SignUpResponseType = {
    midtrans_payment_url: MidtransResponse;
}