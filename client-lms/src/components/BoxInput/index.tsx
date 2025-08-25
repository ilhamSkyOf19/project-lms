import clsx from 'clsx';
import { type FC } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';


type Props = {
    type: 'email' | 'password' | 'name';
    register: UseFormRegisterReturn
    error?: FieldError;

}
const BoxInput: FC<Props> = ({ type, register, error }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-1'>
            <div className={clsx(
                'w-full px-5 py-3.5 rounded-full flex flex-row justify-start items-center bg-primary-black border border-[#24283E] gap-2 shadow-inset-light  transition-all duration-300',
                error ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-primary-purple focus-within:shadow-[-10px_-6px_10px_0_#bd00ff_inset]'
            )}>
                {/* icons */}
                <label htmlFor={type} className='w-6 h-6 flex flex-col justify-center items-center'>
                    <img src={`/assets/images/icons/${type === 'email' ? 'sms-white' : type === 'password' ? 'key-white' : 'user-octagon-white'}.svg`} loading='lazy' />
                </label>

                {/* input */}
                <input
                    type={type === 'name' ? 'text' : type}
                    id={type}
                    className='appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]'
                    placeholder={
                        type === 'email' ? 'Write your email address' : type === 'password' ? 'Type your secure password' : 'Write your complate name'}
                    {...register}
                />

            </div>
            {/* error */}
            <div className='w-full flex flex-row justify-start items-center pl-6 h-6'>
                {
                    error && (
                        <p className='text-red-500 text-xs'>{error.message}</p>
                    )
                }
            </div>
        </div>
    )
}

export default BoxInput
