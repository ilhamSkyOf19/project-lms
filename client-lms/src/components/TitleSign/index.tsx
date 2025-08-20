import { type FC } from 'react'

type Props = {
    text: string;
}

const TitleSign: FC<Props> = ({ text }) => {
    return (
        <div className='w-full pb-8 flex flex-col justify-start items-start relative gap-0.5 line-gray'>
            <h2 className='capitalize font-bold text-white text-2xl'>{text}</h2>
            <h3 className='font-normal text-slate-100 text-md opacity-35'>
                Manage your employees easily
            </h3>
        </div>
    )
}

export default TitleSign
