import { useEffect, useState, type FC } from 'react'
import students from '../../jsons/students.json'
import courses from '../../jsons/course.json'
import CardLatestCourse from '../../components/CardLatestCourse'
import { type DataCourse, type DataStudent } from '../../types'
const Student: FC = () => {
    // state data 
    const [dataCourse, setDataCourse] = useState<DataCourse[]>([])

    // handle set data 
    useEffect(() => {
        const courseId = (students as DataStudent[]).find((item) => item.id === '2')?.courseId
        // console.log(courseId?.includes)
        if (courseId) {
            const getCourses = (courses as DataCourse[]).filter((item) => courseId.includes(item.id))

            if (getCourses) setDataCourse(getCourses)

        }
    }, [])

    console.log(dataCourse)

    return (
        <div className='bg-[#F8FAFB] w-full flex flex-col justify-start items-start p-6 rounded-3xl overflow-x-hidden gap-6'>
            {/* card course */}
            {dataCourse.map((item) => <CardLatestCourse key={item.id} data={item} title='full' role='student' contentId={item.contentList[0].id} />)}
        </div>
    )
}

export default Student
