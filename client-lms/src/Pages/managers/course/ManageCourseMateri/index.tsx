import { useEffect, useState, type FC } from 'react'
import { useParams } from 'react-router'
import HeaderContentDashboard from '../../../../components/HeaderContentDahsboard';
import ButtonBorder from '../../../../components/ButtonBorder';
import ButtonLinkPurple from '../../../../components/ButtonLinkPurple';

import course from '../../../../jsons/course.json'
import { type DataCourse } from '../../../../types';
import CardInfo from '../../../../components/CardInfo';
import CardCourseContent from '../../../../components/CardCourseContent';
import ButtonLinkBorder from '../../../../components/ButtonLinkBorder';
import ButtonDelete from '../../../../components/ButtonnDelete';
import PaginationNumber from '../../../../components/PaginationNumber';
import LinkRoute from '../../../../components/LinkRoute';

const ManageCourseMateri: FC = () => {
    // state pagunation active
    const [paginationActive, setPaginationActive] = useState<number>(1);



    // state data course
    const [data, setData] = useState<DataCourse>();


    // const get query
    const { id } = useParams() as { id: string };

    // handle data course
    useEffect(() => {
        if (id) {
            const getData = (course as DataCourse[]).find((item) => item.id === id);

            if (getData) {
                setData(getData as DataCourse);
            }
        }
    }, [id])

    console.log(data)


    // handle pagination
    const handlePagination = (number: number) => {
        setPaginationActive(number);
    }

    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* link route */}
            <LinkRoute link={[
                { link: '/manager', label: 'dashboard' },
                { link: '/manager/course', label: 'manage course' },
                { link: `/manager/course/manage-course-materi/${id}`, label: 'detail' }]} />

            {/* header content */}
            <HeaderContentDashboard header={data?.name as string} desc=''>
                {/* edit course */}
                <ButtonBorder label='edit course' />
                {/* preview */}
                <ButtonLinkPurple link={`/manager/course/manage-course-materi/${id}/preview/${data?.contentList?.[0].id}`} label='preview' />
            </HeaderContentDashboard>

            {/* content information */}
            <div className='w-full h-[15rem] flex flex-row justify-between items-center gap-12'>
                {/* thumb */}
                <div className='w-[57%] h-full rounded-2xl overflow-hidden'>
                    <img
                        src={`/assets/images/thumbnails/${data?.preview ?? ''}`}
                        alt='course' className='w-full h-full object-cover' loading='lazy' />
                </div>
                <div className='w-[43%] h-full grid grid-cols-2 grid-rows-2 gap-4'>
                    {/* card info */}
                    <CardInfo icon='profile-2user-purple' text={`${(data?.students ?? 0).toLocaleString('en-US')} Students`} />
                    <CardInfo icon='crown-purple' text={data?.category as string} />
                    <CardInfo icon='note-favorite-purple' text={`${(data?.contents ?? 0).toLocaleString('en-US')} Contents`} />
                    <CardInfo icon='cup-purple' text={(data?.certificate as boolean) === true ? 'Certificate' : 'No Certificate'} />
                </div>
            </div>


            {/* course content */}
            <div className='bg-[#F8FAFB] w-full flex flex-col justify-start items-center p-8 rounded-3xl overflow-x-hidden gap-12'>
                {/* title & button */}
                <div className='w-full flex flex-row justify-between items-center'>
                    {/* title */}
                    <h1 className='font-bold capitalize text-2xl text-black'>course content</h1>
                    {/* button */}
                    <ButtonLinkPurple link={`/manager/course/manage-course-materi/${id}/add-content`} label='add content' />
                </div>

                {/* card course */}
                <div className='w-full flex flex-col justify-start items-center gap-6'>
                    {/* card */}
                    {
                        data?.contentList.map((item, index) => (
                            <div key={index} className='w-full flex flex-row justify-between items-center'>
                                <div className='flex-2 flex flex-row justify-start items-center'>
                                    <CardCourseContent data={item} number={index + 1} />
                                </div>
                                {/* button */}
                                <div className='flex-1 flex flex-row justify-end items-center gap-3'>
                                    {/* edit content */}
                                    <ButtonLinkBorder link='#' label='edit content' />
                                    {/* delete */}
                                    <ButtonDelete label='delete' />
                                </div>
                            </div>

                        ))
                    }
                </div>

                {/* pagination */}
                <PaginationNumber paginationActive={paginationActive} handlePagination={handlePagination} pagination={5} />

            </div>

        </div>
    )
}




export default ManageCourseMateri
