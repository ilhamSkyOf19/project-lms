import { type FC } from 'react'
import CircleNumber from '../CircleNumber'
import type { CourseDetailContentResponseType } from '../../model/courseDetail-model';

type Props = {
    number: number;
    data: CourseDetailContentResponseType
}
const CardCourseContent: FC<Props> = ({ number, data: { title, type } }) => {
    return (
        <div className='w-full h-[8rem] flex flex-row justify-start items-center gap-5 relative'>
            {/* number */}
            <CircleNumber number={number} />
            {/* content */}
            <div className='w-[12.5rem] h-[90%] rounded-3xl bg-primary-black relative overflow-hidden flex flex-col justify-center items-center'>
                {/* circle glow */}
                <div className='absolute w-[10rem] h-[10rem] rounded-full bg-gradient-to-l to-white from-primary-purple z-0 top-[50%] blur-xl opacity-60' />
                {/* icon */}
                <img src={`/assets/images/icons/${type === 'video' ? 'video-play-white.svg' : 'note-white.svg'}`} alt="icon" className='w-12 rounded-2xl' loading='lazy' />
            </div>

            {/* desc */}
            <div className='w-full h-full flex flex-col justify-center items-start gap-2'>
                {/* name */}
                <h2 className='font-bold text-xl'>
                    {title}
                </h2>
                {/* category */}
                <div className='w-full flex flex-row justify-start items-start gap-2'>
                    {/* icon */}
                    <img src={`/assets/images/icons/${type === 'video' ? 'video-play-purple.svg' : 'note-purple.svg'}`} alt="icon" className='w-5.5' loading='lazy' />
                    {/* label */}
                    <p className=' text-md text-slate-500 capitalize'>
                        {type} content
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardCourseContent
