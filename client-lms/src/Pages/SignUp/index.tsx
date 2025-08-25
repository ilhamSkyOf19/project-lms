import { useState, type FC } from 'react'
import FormSignUp from '../../assets/fragments/FormSignUp'
import LayoutGlobal from '../../Layouts/LayoutGlobal'
import Pricing from '../Pricing';
import type { SignUpRequestType } from '../../model/auth-model';


const SignUp: FC = () => {
    // state mode 
    const [mode, setMode] = useState<'AUTH' | "PRICING">('AUTH');
    const [dataSignUp, setDataSignUp] = useState<SignUpRequestType>();






    return (
        <>
            {mode === "AUTH" ? (
                <LayoutGlobal>
                    <div className='w-full h-full flex flex-row justify-center items-center gap-24'>
                        {/* form login */}
                        <div className='w-full flex flex-row justify-end items-start'>
                            <FormSignUp setMode={setMode} setDataSignUp={setDataSignUp} />
                        </div>
                        {/* title */}
                        <div className='w-full flex flex-row justify-start items-center'>
                            <div className='flex flex-col justify-center items-center gap-8'>
                                {/* big title */}
                                <div className='w-full flex flex-col justify-start items-start'>
                                    <h1 className='text-white font-bold capitalize text-[2.8rem]'>sign up & enhance <br /> employees skills</h1>
                                </div>
                                <div className='w-full flex flex-col justify-start items-start'>
                                    <p className='text-white text-lg'>
                                        We delivery robust features to anyone <br /> unconditionally so they can grow bigger.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutGlobal>
            ) : (
                <Pricing data={dataSignUp as SignUpRequestType} />
            )}
        </>
    )
}

export default SignUp
