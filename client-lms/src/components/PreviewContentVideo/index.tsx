import { type FC } from 'react'
import type { DataContent } from '../../types'
import ButtonPurple from '../ButtonPurple';


type Props = {
    data: DataContent;
}
const PreviewContentVideo: FC<Props> = ({ data }) => {
    return (
        <div className='w-full flex flex-col justify-start items-start gap-12'>
            {/* content video */}
            <iframe
                src={data?.contentVideo}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading='lazy'
                className='w-full h-[25rem] rounded-3xl'
            ></iframe>
            {/* title & button */}
            <div className='w-full flex flex-row justify-between items-start'>
                <h1 className='flex-2 font-bold text-black text-3xl'>
                    {data?.name}
                </h1>
                {/* button complated */}
                <ButtonPurple label='Mark as Complated' />
            </div>

        </div>
    )
}

export default PreviewContentVideo
