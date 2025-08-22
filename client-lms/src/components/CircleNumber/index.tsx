import { type FC } from 'react'

type Props = {
    number: number;
}
const CircleNumber: FC<Props> = ({ number }) => {
    return (
        <div className='w-8 h-8 flex flex-row justify-center items-center bg-primary-purple absolute -top-1 -left-2 z-10 rounded-full'>
            <p className='font-bold text-sm text-white'>{number}</p>
        </div>
    )
}

export default CircleNumber
