import { type FC } from 'react'
import LayoutGlobal from '../../Layouts/LayoutGlobal'
import CardPricing from '../../components/CardPricing'

const Pricing: FC = () => {
    return (
        <LayoutGlobal>
            {/* title */}
            <div className='w-full  flex flex-col justify-start items-center gap-5 pt-12'>
                <h1 className='text-white font-bold capitalize text-[2.8rem] text-center'>
                    Best Pricing For Everyone <br />Who Wants to Grow Business
                </h1>
                <p className='text-lg text-white'>
                    We delivery robust features to anyone unconditionally.
                </p>
            </div>
            {/* cards */}
            <div className='w-full flex flex-row justify-start items-start gap-8 py-12'>
                {/* card 1 */}
                <div className='w-full flex flex-row justify-end items-center'>
                    <CardPricing type='regular' country='id_ID' />
                </div>
                <div className='w-full flex flex-row justify-start items-center'>
                    <CardPricing type='premium' country='id_ID' />
                </div>
            </div>
        </LayoutGlobal>
    )
}

export default Pricing
