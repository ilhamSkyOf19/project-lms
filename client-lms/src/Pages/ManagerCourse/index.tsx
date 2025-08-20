import { useState, type FC } from 'react'
import HeaderContentDashboard from '../../components/HeaderContentDahsboard'
import ButtonBorder from '../../components/ButtonBorder'
import ButtonLinkPurple from '../../components/ButtonLinkPurple'
import course from '../../jsons/course.json'
import CardManageCourse from '../../components/CardManageCourse'
import type { DataCourse } from '../../types'
import ButtonPagination from '../../components/ButtonPagination'

const ManagerCourse: FC = () => {
    // state pagination active
    const [paginationActive, setPaginationActive] = useState<number>(1)

    // handle pagination
    const handlePagination = (number: number) => {
        setPaginationActive(number)
    }


    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* header content */}
            <HeaderContentDashboard header='manage course' desc='give the bust future for you great employees'>
                {/* import file */}
                <ButtonBorder label='import file' />
                {/* new course */}
                <ButtonLinkPurple link='#' label='new course' />
            </HeaderContentDashboard>

            {/* content course */}
            <div className='bg-[#F8FAFB] w-full flex flex-col justify-start items-center p-6 py-12 rounded-3xl overflow-x-hidden gap-12'>
                {
                    course.map((course, index) => (
                        <CardManageCourse key={index} data={course as DataCourse} />
                    ))
                }

                {/* pagination */}
                <Pagination paginationActive={paginationActive} handlePagination={handlePagination} />
            </div>

        </div>
    )
}


type PropsPagination = {
    paginationActive: number;
    handlePagination: (number: number) => void
}
// pagination
const Pagination: FC<PropsPagination> = ({ paginationActive, handlePagination }) => {


    return (
        <div className='w-full flex flex-row justify-start items-start gap-2.5'>
            {
                [1, 2, 3, 4, 5].map((item, index) => (
                    <ButtonPagination key={index} number={item} handleButton={() => handlePagination(item)} active={paginationActive === item} />
                ))
            }
        </div>
    )
}

export default ManagerCourse
