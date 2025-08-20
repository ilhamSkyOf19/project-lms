import { type FC } from 'react'

type Props = {
    text: string;
}
const ListFeaturesCardPricing: FC<Props> = ({ text }) => {
    return (
        <div className='w-full flex flex-row justify-start items-center gap-2'>
            {/* icons */}
            <img src='/assets/images/icons/tick-circle-white.svg' alt='pricing icon' className='w-7 h-7' loading='lazy' />
            {/* text */}
            <p className='font-semibold text-white text-md'>
                {text}
            </p>
        </div>
    )
}

export default ListFeaturesCardPricing
