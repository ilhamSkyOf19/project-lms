import { useState, type FC } from 'react'
import HeaderContentDashboard from '../../../../components/HeaderContentDahsboard'
import ButtonBorder from '../../../../components/ButtonBorder'
import ButtonLinkPurple from '../../../../components/ButtonLinkPurple'
import CardLatestStudent from '../../../../components/CardLatestStudent'
import students from '../../../../jsons/students.json'
import type { DataStudent } from '../../../../types'
import ButtonLinkBorder from '../../../../components/ButtonLinkBorder'
import ButtonDelete from '../../../../components/ButtonnDelete'
import PaginationNumber from '../../../../components/PaginationNumber'

const ManagerStudents: FC = () => {
    // state pagination active
    const [paginationActive, setPaginationActive] = useState<number>(1)

    // handle pagination
    const handlePagination = (number: number) => {
        setPaginationActive(number)
    }
    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* header content */}
            <HeaderContentDashboard header='manage students' desc='Keep your employee or student happy'>
                {/* import file */}
                <ButtonBorder label='import file' />
                {/* add students */}
                <ButtonLinkPurple link='/manager/students/add-student' label='add students' />
            </HeaderContentDashboard>

            {/* content */}
            <div className='bg-[#F8FAFB] w-full flex flex-col justify-start items-center p-8 rounded-3xl overflow-x-hidden gap-12'>
                {/* card student */}
                {
                    students.map((item, i) => (
                        <CardManageStudent key={i} data={item as DataStudent} />
                    ))
                }

                {/* pagination */}
                <PaginationNumber paginationActive={paginationActive} handlePagination={handlePagination} pagination={5} />
            </div>
        </div>
    )
}


type PropsCardManageStudent = {
    data: DataStudent;
}

// card manage students
const CardManageStudent: FC<PropsCardManageStudent> = ({ data }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center'>
            {/* card */}
            <CardLatestStudent data={data as DataStudent} />
            {/* button */}
            <div className='w-full flex flex-row justify-end items-center gap-3'>
                {/* edit profile */}
                <ButtonLinkBorder link='#' label='edit profile' />
                {/* button delete */}
                <ButtonDelete label='delete' />
            </div>
        </div>
    )
}

export default ManagerStudents
