import { useEffect, useState, type FC } from 'react'
import { Link, useParams } from 'react-router'
import CardCourseContentPreview from '../CardCourseContentPreview'
import type { CourseDetailResponse } from '../../model/course-model'
import { CourseService } from '../../service/course.service'

type Props = {
    role: 'manager' | 'student'
}

const SideBarPreview: FC<Props> = ({ role }) => {
    // state data course
    const [dataCourse, setDataCourse] = useState<CourseDetailResponse | undefined>(undefined)

    // get params
    const { id, idContent } = useParams() as { id: string; idContent: string }

    // handle data course
    useEffect(() => {
        const handleDataCourse = async () => {
            const res = await CourseService.getDetailSidebar(id)

            if (!res) {
                console.log('No data returned')
                return
            }

            if (!res.success) {
                console.log(res.message)
            } else {
                setDataCourse(res.data)
            }
        }

        handleDataCourse()
    }, [id])

    return (
        <nav className="w-full h-full flex flex-col justify-start items-start rounded-3xl bg-primary-black relative overflow-hidden">
            {/* circle glow */}
            <div className="absolute w-[35rem] h-[35rem] rounded-full bg-gradient-to-l to-white from-primary-purple z-0 -bottom-[25rem] blur-3xl opacity-60" />

            {/* content */}
            <div className="flex-1 w-full flex flex-col justify-start items-center bg-transparent backdrop-blur-2xl py-8 px-8 gap-9 overflow-y-scroll hide-scrollbar">
                {/* link back dashboard */}
                {dataCourse ? (
                    <>
                        <div className="w-full flex flex-col justify-start items-start">
                            <Link
                                to={role === 'student' ? '/student' : '/manager'}
                                className="font-semibold text-white text-md capitalize hover:underline mb-8"
                            >
                                back to dashboard
                            </Link>

                            {/* thumb */}
                            <div className="w-[9rem] h-[8rem] flex flex-row justify-center items-center rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={dataCourse.thumbnail_url}
                                    alt="thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* name course */}
                            <h1 className="font-bold text-white text-xl">{dataCourse.name || ''}</h1>
                        </div>

                        {/* card content course */}
                        <div className="w-full flex flex-col justify-start items-center gap-4">
                            {dataCourse.details.map((item, i) => (
                                <CardCourseContentPreview
                                    key={i}
                                    icon={item.type}
                                    name={item.title}
                                    active={idContent === item._id}
                                    link={
                                        role === 'student'
                                            ? `/student/course/${id}/preview/${item._id}`
                                            : `/manager/course/manage-course-materi/${id}/preview/${item._id}`
                                    }
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </nav>
    )
}

export default SideBarPreview
