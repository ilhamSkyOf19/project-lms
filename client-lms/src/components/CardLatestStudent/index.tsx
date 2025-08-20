import { type FC } from 'react'
import type { DataStudent } from '../../types'

type Props = {
    data: DataStudent;
}

const CardLatestStudent: FC<Props> = ({ data: { name, totalCourse, statusCourse, img } }) => {
    return (
        <div className='w-full h-[6rem] flex flex-row justify-start items-center gap-4'>
            {/* avatar */}
            <div className='w-22 h-22 rounded-3xl overflow-hidden group'>
                <img src={`/assets/images/photos/${img}`} alt='students' className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300' loading='lazy' />
            </div>
            {/* desc */}
            <div className='h-full flex flex-col justify-center items-start gap-2.5'>
                {/* name */}
                <h3 className='capitalize font-bold text-xl'>{name}</h3>
                {/* icon, total course, status course */}
                <div className='flex flex-row justify-start items-start gap-2'>
                    {/* icons */}
                    <img src='/assets/images/icons/crown-purple.svg' alt='crown' className='w-5 h-5' loading='lazy' />
                    {/* total course */}
                    <p className='text-slate-500 text-md capitalize'>{totalCourse}<span className='ml-1'>{statusCourse ? 'Course Joined' : 'Course Not Joined'}</span></p>
                </div>
            </div>
        </div>
    )
}

export default CardLatestStudent
