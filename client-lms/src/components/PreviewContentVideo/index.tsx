import { type FC } from 'react'
import ButtonPurple from '../ButtonPurple';
import type { CourseDetailContentResponseType } from '../../model/courseDetail-model';


type Props = {
    data?: CourseDetailContentResponseType;
}
const PreviewContentVideo: FC<Props> = ({ data }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-12'>
            {/* content video */}
            <iframe
                src={`https://www.youtube.com/embed/${data?.videoId}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading='lazy'
                className='w-full h-[25rem] rounded-3xl'
            ></iframe>
            {/* title & button */}
            <div className='w-full flex flex-row justify-between items-start'>
                <h1 className='flex-2 font-bold text-black text-3xl'>
                    {data?.title}
                </h1>
                {/* button complated */}
                <ButtonPurple label='Mark as Complated' />
            </div>

        </div>
    )
}

export default PreviewContentVideo
