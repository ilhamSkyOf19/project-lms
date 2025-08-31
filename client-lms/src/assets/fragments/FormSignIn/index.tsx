import { type FC } from 'react'
import BoxInput from '../../../components/BoxInput'
import { Link, useNavigate } from 'react-router'
import TitleSign from '../../../components/TitleSign'
import ButtonSign from '../../../components/ButtonSign'
import { useForm } from 'react-hook-form'
import { type SignInRequestType } from '../../../model/login-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthValidation } from '../../../validation/auth-validation'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../../../service/auth.service'

const FormSignIn: FC = () => {

    const navigate = useNavigate();


    // use form 
    const { register, handleSubmit, formState: { errors }, setError } = useForm<SignInRequestType>({
        resolver: zodResolver(AuthValidation.signIn)
    })

    // handle mutation 
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: SignInRequestType) => AuthService.signIn({
            ...data
        })
    })

    // on submit 
    const onSubmit = async (data: SignInRequestType) => {
        if (!data) return;

        // response 
        const response = await mutateAsync(data);

        if (!response.success) {
            setError(("email"), { type: 'manual', message: response.message });
            setError(("password"), { type: 'manual', message: response.message });
        } else {
            console.log('response', response.data);

            console.log('role', response.data.role);

            if (response.data.role === 'manager') {
                navigate('/manager')
            } else {
                navigate('/student')
            }
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-[25rem] min-h-[28rem] rounded-2xl flex flex-col justify-start items-center py-8 px-8 bg-primary-black border border-[#24283E]'>
            {/* title */}
            <TitleSign text='welcome back!' />

            {/* input & button */}
            <div className='w-full flex flex-col justify-start items-center gap-4'>
                {/* input */}
                <div className='gap-3 w-full flex flex-col justify-start items-center flex-2 relative line-gray py-6'>
                    <div className='w-full flex flex-col justify-start items-center gap-1'>
                        <BoxInput type='email' register={register('email')} error={errors.email} />
                        <BoxInput type='password' register={register('password')} error={errors.password} />
                    </div>
                    <div className='w-full flex flex-row justify-end items-center'>
                        <Link to={'/'} className='text-sm text-primary-purple hover:underline'>
                            Forgot Password
                        </Link>
                    </div>
                </div>
                {/* button */}
                <ButtonSign label='sign in to manage' disabled={isPending} />
            </div>


        </form>
    )
}

export default FormSignIn
