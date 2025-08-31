import { useState, type FC } from 'react'
import HeaderContentDashboard from '../../../../components/HeaderContentDahsboard'
import ButtonBorder from '../../../../components/ButtonBorder'
import ButtonLinkPurple from '../../../../components/ButtonLinkPurple'
import CardManageCourse from '../../../../components/CardManageCourse'
import PaginationNumber from '../../../../components/PaginationNumber'
import { CourseService } from '../../../../service/course.service'
import type { CourseDetailResponse } from '../../../../model/course-model'
import { useLoaderData, useRevalidator } from 'react-router'

const ManagerCourse: FC = () => {
    // data course use loader
    const dataCourse = useLoaderData() as CourseDetailResponse[];

    // revalidate 
    const { revalidate } = useRevalidator();
    // state pagination active
    const [paginationActive, setPaginationActive] = useState<number>(1)


    // handle pagination
    const handlePagination = (number: number) => {
        setPaginationActive(number)
    }

    const handleDelete = async (id: string) => {
        const fetch = await CourseService.delete(id);

        if (fetch.success) {
            console.log(fetch.data.message);
            revalidate();
        } else {
            console.log(fetch.message);
        }

    };



    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* header content */}
            <HeaderContentDashboard header='manage course' desc='give the bust future for you great employees'>
                {/* import file */}
                <ButtonBorder label='import file' />
                {/* new course */}
                <ButtonLinkPurple link='/manager/course/new-course' label='new course' />
            </HeaderContentDashboard>

            {/* content course */}
            <div className='bg-[#F8FAFB] w-full flex flex-col justify-start items-center p-8 rounded-3xl overflow-x-hidden gap-12'>
                {
                    dataCourse && dataCourse.length > 0 ? (
                        dataCourse.map((item, i) => (
                            <CardManageCourse key={i} data={item} handleDelete={() => handleDelete(item._id)} />
                        ))
                    ) : (
                        <p>no data</p>
                    )
                }

                {/* pagination */}
                <PaginationNumber paginationActive={paginationActive} handlePagination={handlePagination} pagination={5} />
            </div>

        </div>
    )
}




export default ManagerCourse
