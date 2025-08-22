import { useEffect, useState, type FC } from 'react'
import { type DataCourse } from '../../types'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import course from '../../jsons/course.json'
import CardCourseContentPreview from '../CardCourseContentPreview'
const SideBarPreview: FC = () => {

    // state data course
    const [dataCourse, setDataCourse] = useState<DataCourse>();
    // get params 
    const { id, idContent } = useParams() as { id: string, idContent: string };

    // handle data course 
    useEffect(() => {
        if (id) {
            const getData: DataCourse = (course as DataCourse[]).find((item) => item.id === id) as DataCourse;

            if (getData) {
                setDataCourse(getData);
            }
        }
    }, [id])

    console.log(idContent)


    return (
        <nav className='w-full h-full flex flex-col justify-start items-start rounded-3xl bg-primary-black relative overflow-hidden'>
            {/* circle glow */}
            <div className='absolute w-[35rem] h-[35rem] rounded-full bg-gradient-to-l to-white from-primary-purple z-0 -bottom-[25rem] blur-3xl opacity-60' />

            {/* content */}
            <div className='flex-1 w-full flex flex-col justify-start items-center bg-transparent backdrop-blur-2xl py-8 px-8 gap-9 overflow-y-scroll hide-scrollbar'>
                {/* link back dashboard */}
                <div className='w-full flex flex-col justify-start items-start'>
                    <Link to='/manager' className='font-semibold text-white text-md capitalize hover:underline mb-8'>back to dashboard</Link>
                    {/* thumb */}
                    <div className='w-[9rem] h-[8rem] flex flex-row justify-center items-center rounded-2xl overflow-hidden mb-4'>
                        <img src={`/assets/images/thumbnails/${dataCourse?.img}`} alt="thumbnail" className='w-full h-full object-cover' />
                    </div>
                    {/* name course */}
                    <h1 className='font-bold text-white text-xl'>
                        {dataCourse?.name}
                    </h1>
                </div>

                {/* card content course */}
                <div className='w-full flex flex-col justify-start items-center gap-4'>
                    {/* card */}
                    {
                        dataCourse?.contentList.map((item, i) => (
                            <CardCourseContentPreview key={i} icon={item.category} name={item.name} active={idContent === (i + 1).toString()} />

                        ))
                    }
                </div>

            </div>
        </nav>
    )
}

export default SideBarPreview;
