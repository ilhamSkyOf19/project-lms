import { type FC } from 'react'
import CardLatestStudent from '../../../components/CardLatestStudent'
import students from '../../../jsons/students.json'
import course from '../../../jsons/course.json'
import type { DataStudent, DataCourse } from '../../../types'
import CardLatestCourse from '../../../components/CardLatestCourse'

const ContentLatest: FC = () => {
    return (
        <div className='w-full rounded-3xl flex flex-row justify-between items-start gap-11'>
            {/* latest course */}

            <ContentLatestComponent type='course' />
            {/* latest students */}
            <ContentLatestComponent type='student' />

        </div>
    )
}

type PropsContentLatestComponent = {
    type: 'course' | 'student'
}

// content latest 
const ContentLatestComponent: FC<PropsContentLatestComponent> = ({ type }) => {
    return (
        <div className='flex-1 p-8 bg-primary-white rounded-3xl min-h-[40rem]'>
            {/* title */}
            <h2 className='font-bold text-2xl text-black capitalize mb-8'>
                {
                    type === 'course' ? 'latest course' : 'latest students'
                }

            </h2>
            {/* card students */}
            <div className='w-full flex flex-col justify-start items-start gap-7'>
                {
                    type === 'course' ? (
                        course.map((course, index) => (
                            <CardLatestCourse key={index} data={course as DataCourse} />
                        ))
                    ) : (
                        students.map((student, index) => (
                            <CardLatestStudent key={index} data={student as DataStudent} />
                        ))

                    )
                }
            </div>

        </div>
    )
}

export default ContentLatest
