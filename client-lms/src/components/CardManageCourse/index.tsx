import { type FC } from 'react'
import ButtonLinkBorder from '../ButtonLinkBorder';
import IconDescComponent from '../IconDescComponent';
import type { CourseWithTotalStudent } from '../../model/course-model';

type Props = {
    data: CourseWithTotalStudent;
}
const CardManageCourse: FC<Props> = ({ data: { name, thumbnail_url, category, total_student, _id } }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center'>
            {/* course */}
            <div className='w-full h-[6rem] flex flex-row justify-start items-center gap-6 group'>
                {/* course */}
                <div className='w-35 h-27 rounded-3xl overflow-hidden '>
                    <img src={`${thumbnail_url}`} alt='course' className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300' loading='lazy' />
                </div>
                {/* desc */}
                <div className='h-full flex flex-col justify-center items-start gap-2.5'>
                    {/* title */}
                    <h2 className='text-xl text-black font-bold group-hover:text-primary-purple transition-all duration-300 capitalize'>
                        {name}
                    </h2>
                    {/* student and category */}
                    <div className='flex flex-row justify-start items-start gap-2'>
                        <IconDescComponent icon='profile-2user-purple.svg' label={`${total_student.toLocaleString('en-US')} Students`} />
                        <IconDescComponent icon='crown-purple.svg' label={category.name} />
                    </div>
                </div>
            </div>
            {/* button */}
            <ButtonLinkBorder link={`/manager/course/manage-course-materi/${_id}`} label='manage' />
        </div>
    )
}



export default CardManageCourse
