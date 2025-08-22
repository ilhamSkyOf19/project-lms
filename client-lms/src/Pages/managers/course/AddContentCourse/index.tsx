import { useEffect, useState, type FC } from 'react'
import LinkRoute from '../../../../components/LinkRoute'
import { useParams } from 'react-router'
import course from '../../../../jsons/course.json'
import type { DataCourse } from '../../../../types'
import BoxInputData from '../../../../components/BoxInputData'
import BoxInputChoose from '../../../../components/BoxInputChoose'
import ButtonBorder from '../../../../components/ButtonBorder'
import ButtonPurple from '../../../../components/ButtonPurple'

const AddContentCourse: FC = () => {
    const [thumb, setThumb] = useState<string>('');
    const [contentType, setContentType] = useState<string>('');

    // get params
    const { id } = useParams() as { id: string };



    // handle data course thumb
    useEffect(() => {
        if (id) {
            const getData: DataCourse | undefined = (course as DataCourse[]).find((id) => id === id);

            if (getData) {
                setThumb(getData.img);
            }
        }
    }, [])


    // handle content type 
    const handleContentType = (option: string) => {
        setContentType(option);
    }


    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* link route */}
            <LinkRoute link={[
                { link: '/manager', label: 'dashboard' },
                { link: `/manager/course/manage-course-materi/${id}`, label: 'manage course' },
                { link: `/manager/course/manage-course-materi/${id}/add-content`, label: 'add content' }]} />

            {/* preview thumb course  */}
            <div className='w-full h-[6.5rem] flex flex-row justify-start items-center gap-6'>
                {/* thumb */}
                <div className='w-[9rem] h-full rounded-3xl overflow-hidden'>
                    <img src={`/assets/images/thumbnails/${thumb}`} alt="thumb course" className='w-full h-full object-cover' loading='lazy' />
                </div>
                {/* text */}
                <div className='h-full flex flex-col justify-center items-start gap-1.5'>
                    {/* title */}
                    <h2 className='font-extrabold text-3xl capitalize'>
                        add content
                    </h2>
                    <p className='text-slate-500 font-md'>Give a best content for the course</p>
                </div>
            </div>

            {/* content input */}
            <div className='bg-[#F8FAFB] w-full flex flex-col justify-start items-center p-8 rounded-3xl overflow-x-hidden'>
                {/* input */}
                <form className='w-full h-full flex flex-col justify-start items-start gap-8'>
                    {/* content title */}
                    <BoxInputData icon='note-favorite-black.svg' label='Content Title' type='text' placeholder='Write better name for your course' name='contentTitle' />

                    {/* input content type */}
                    <BoxInputChoose name='contentType' chooses={['video', 'text']} icon='crown-black.svg' label='select type' value={contentType} handleOnChange={handleContentType} placeholder='Choose content type' />

                    {
                        contentType === 'video' ? (

                            <BoxInputData icon='bill-black.svg' label='Youtube Video ID' type='text' placeholder='Write tagline for better copy' name='youtubeVideoID' />
                        ) : contentType === 'text' ? (

                            <BoxInputData icon='note-favorite-black.svg' label='Content Text' type='textarea' placeholder='Write better name for your course' name='contentText' />
                        ) : (
                            <div className='w-full' />
                        )
                    }

                    {/* button */}
                    <div className='w-full flex flex-row justify-center items-center gap-4'>
                        {/* save as draft */}
                        <ButtonBorder label='save as draft' width='full' type='submit' />
                        {/* add content */}
                        <ButtonPurple label='add content now' width='full' type='submit' />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddContentCourse
