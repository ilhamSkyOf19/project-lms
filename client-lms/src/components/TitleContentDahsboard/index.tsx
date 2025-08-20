import { type FC } from 'react'

type Props = {
    header: string;
    desc: string;
}
const TitleContentDahsboard: FC<Props> = ({ header, desc }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start'>
            <h2 className='font-extrabold text-black text-3xl capitalize'>{header}</h2>
            <p className='text-slate-400'>{desc}</p>
        </div>
    )
}

export default TitleContentDahsboard
