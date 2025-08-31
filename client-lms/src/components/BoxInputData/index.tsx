import clsx from 'clsx';
import { type FC } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';


type Props = {
    type: 'email' | 'password' | 'text' | 'textarea';
    name: string;
    icon: string;
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
}

const BoxInputData: FC<Props> = ({ icon, name, label, type, placeholder, register, error }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-1'>
            <div className='w-full flex flex-col justify-start items-start gap-2.5'>
                {/* label */}
                <label htmlFor={name} className='font-semibold text-black text-md capitalize'>
                    {label}
                </label>
                <div className={clsx(
                    'w-full px-5 flex flex-row justify-start items-start bg-transparent border border-[#CFDBEF] gap-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-purple',
                    type === 'textarea' ? 'rounded-3xl py-4.5' : 'rounded-full py-3.5'
                )}>
                    {/* icons */}
                    <label htmlFor={name} className='w-6 h-6 flex flex-col justify-center items-center'>
                        <img src={`/assets/images/icons/${icon}`} loading='lazy' />
                    </label>

                    {/* input */}
                    {
                        type === 'textarea' ? (
                            <textarea
                                {...register}
                                name={name}
                                id={name}
                                className='appearance-none outline-none bg-transparent w-full font-semibold text-black placeholder:font-normal placeholder:text-[#6B6C7F] h-[10rem]'
                                placeholder={placeholder}
                            // required

                            />
                        ) : (
                            <input
                                {...register}
                                type={type}
                                name={name}
                                id={name}
                                className='appearance-none outline-none !bg-transparent w-full font-semibold text-black placeholder:font-normal placeholder:text-[#6B6C7F] '
                                placeholder={placeholder}
                            // required
                            />
                        )
                    }
                </div>
            </div>
            {/* error message */}
            <div className='min-h-6'>
                <ErrorMessage error={error?.message} />
            </div>
        </div>
    )
}

export default BoxInputData
