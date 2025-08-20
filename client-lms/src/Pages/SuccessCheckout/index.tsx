import { type FC } from 'react'
import LayoutGlobal from '../../Layouts/LayoutGlobal'
import ButtonPurple from '../../components/ButtonLinkPurple'

const SuccessCheckout: FC = () => {
    return (
        <LayoutGlobal>
            <div className='w-full h-full flex flex-col justify-start items-center mt-4 gap-8'>
                {/* title */}
                <h1 className='font-extrabold text-5xl text-white text-center leading-[4rem]'>Success Checkout <br /> Please log in to continue</h1>

                {/* button */}
                <ButtonPurple link={'/sign-in'} label={'Sign In Now'} />
            </div>
        </LayoutGlobal>
    )
}

export default SuccessCheckout
