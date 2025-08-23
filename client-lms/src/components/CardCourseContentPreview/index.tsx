import clsx from 'clsx';
import { useState, type FC } from 'react'
import { Link } from 'react-router';


type Props = {
    icon: 'video' | 'text';
    name: string;
    active: boolean;
    link: string;

}
const CardCourseContentPreview: FC<Props> = ({ link, icon, name, active }) => {

    const [dot, setDot] = useState<boolean>(true);

    return (
        <Link to={link} className={clsx(
            'w-full px-5 py-3.5 rounded-full flex flex-row justify-start items-start  border border-[#24283E] gap-3 transition-all duration-300 hover:bg-primary-purple hover:shadow-[-10px_-6px_10px_0_#bd00ff_inset]',
            active ? 'bg-primary-purple shadow-[-10px_-6px_10px_0_#bd00ff_inset]' : 'bg-primary-black  shadow-inset-light '
        )}>
            {/* icons */}
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={`/assets/images/icons/${icon === 'video' ? 'video-play-white.svg' : 'note-white.svg'}`} loading='lazy' className='w-7 h-7' />
            </div>

            {/* name course */}
            <div className='w-full h-full flex flex-col justify-center items-center group' onMouseEnter={() => setDot(false)} onMouseLeave={() => setDot(true)}>
                <h3 className='w-full font-semibold text-white text-sm line-clamp-1 group-hover:line-clamp-none'>
                    {name}{dot ? '...' : ''}
                </h3>
            </div>
        </Link>
    )
}

export default CardCourseContentPreview
