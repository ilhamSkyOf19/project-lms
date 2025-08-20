import { type FC } from 'react'
import BoxInput from '../../../components/BoxInput'
import { Link } from 'react-router'
import TitleSign from '../../../components/TitleSign'
import ButtonSign from '../../../components/ButtonSign'

const FormSignUp: FC = () => {
    return (
        <form className='w-[25rem] min-h-[28rem] rounded-2xl flex flex-col justify-start items-center py-8 px-8 bg-primary-black border border-[#24283E]'>
            {/* title */}
            <TitleSign text='sign up' />

            {/* input & button */}
            <div className='w-full flex flex-col justify-start items-center gap-4'>
                {/* input */}
                <div className='gap-3 w-full flex flex-col justify-start items-center flex-2 relative line-gray py-6'>
                    <div className='w-full flex flex-col justify-start items-center gap-8'>
                        <BoxInput type='name' />
                        <BoxInput type='email' />
                        <BoxInput type='password' />
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

export default FormSignUp
