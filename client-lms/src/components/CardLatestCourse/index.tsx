import { type FC } from 'react'
import { Link } from 'react-router'
import type { DataCourse } from '../../types'
import IconDescComponent from '../IconDescComponent';

type Props = {
    data: DataCourse;
    title?: 'full';
    role?: 'manager' | 'student';
    contentId?: string
}

const CardLatestCourse: FC<Props> = ({ data: { id, name, img, category }, title, role, contentId }) => {
    return (
        <Link to={role === 'student' ? `/student/course/${id}/preview/${contentId}` : `/manager/course/manage-course-materi/${id}/add-content`} className='w-full h-[6rem] flex flex-row justify-start items-center gap-4 group'>
            {/* course */}
            <div className='w-26 h-21 rounded-3xl overflow-hidden '>
                <img src={`/assets/images/thumbnails/${img}`} alt='course' className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300' loading='lazy' />
            </div>
            {/* desc */}
            <div className='h-full flex flex-col justify-center items-start gap-2.5'>
                {/* title */}
                <h2 className='text-xl text-black font-bold group-hover:text-primary-purple transition-all duration-300 capitalize'>
                    {
                        title === 'full'
                            ? name
                            : `${name.slice(0, 17)}...`
                    }
                </h2>
                {/* icon & category */}
                <IconDescComponent icon='crown-purple.svg' label={category} />
            </div>
        </Link>
    )
}

export default CardLatestCourse
