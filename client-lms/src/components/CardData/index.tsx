import { type FC } from 'react'


type Props = {
    icon: 'profile-2user-purple' | 'note-favorite-purple' | 'video-play-purple' | 'note-purple';
    number: number;
    desc: string;
}
const CardData: FC<Props> = ({ icon, number, desc }) => {
    return (
        <div className='w-[15rem] h-[10.5rem] rounded-3xl bg-white shadow-md p-5 flex flex-col justify-start items-start gap-6 hover:shadow-primary-purple-opacity transition-all duration-300'>
            {/* icons */}
            <img src={`/assets/images/icons/${icon}.svg`} />
            {/* number & text*/}
            <div className='w-full flex flex-col justify-start items-start'>
                {/* number */}
                <h2 className='font-extrabold text-2xl'>
                    {number.toLocaleString('en-US')}
                </h2>
                {/* text */}
                <p className='capitalize text-slate-500 text-md'>{desc}</p>
            </div>
        </div>
    )
}

export default CardData
