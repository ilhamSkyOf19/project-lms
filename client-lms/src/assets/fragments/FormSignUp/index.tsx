import { memo, type FC } from 'react'
import BoxInput from '../../../components/BoxInput'
import { Link } from 'react-router'
import TitleSign from '../../../components/TitleSign'
import ButtonSign from '../../../components/ButtonSign'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { type SignUpRequestType } from '../../../model/auth-model';
import { AuthValidation } from '../../../validation/auth-validation'

type Props = {
    setMode: (mode: "AUTH" | "PRICING") => void;
    setDataSignUp: (data: SignUpRequestType) => void;
}
const FormSignUp: FC<Props> = ({ setMode, setDataSignUp }) => {

    // use form 
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpRequestType>({
        resolver: zodResolver(AuthValidation.signUp)
    })

    const onSubmit = (data: SignUpRequestType) => {
        setDataSignUp(data);
        setMode('PRICING');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-[25rem] min-h-[28rem] rounded-2xl flex flex-col justify-start items-center py-8 px-8 bg-primary-black border border-[#24283E]'>
            {/* title */}
            <TitleSign text='sign up' />

            {/* input & button */}
            <div className='w-full flex flex-col justify-start items-center gap-4'>
                {/* input */}
                <div className='gap-3 w-full flex flex-col justify-start items-center flex-2 relative line-gray py-6'>
                    <div className='w-full flex flex-col justify-start items-center gap-4'>
                        <BoxInput type="name" register={register("name")} error={errors.name} />
                        <BoxInput type="email" register={register("email")} error={errors.email} />
                        <BoxInput type="password" register={register("password")} error={errors.password} />

                    </div>
                    <div className='w-full flex flex-row justify-end items-center'>
                        <Link to={'/'} className='text-sm text-primary-purple hover:underline'>
                            Forgot Password
                        </Link>
                    </div>
                </div>
                {/* button */}
                <ButtonSign label='sign up now' />
            </div>
        </form>
    )
}

export default memo(FormSignUp)
