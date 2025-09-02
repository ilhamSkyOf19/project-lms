import { type FC } from 'react'
import { useLoaderData } from 'react-router';

import PreviewContentVideo from '../../components/PreviewContentVideo';
import type { CourseDetailContentResponseType } from '../../model/courseDetail-model';


const Preview: FC = () => {
    // state data content
    // const [dataContent, setDataContent] = useState<DataContent | undefined>(undefined)

    // get loader data 
    const dataContent = useLoaderData() as CourseDetailContentResponseType;






    return (
        <>
            {
                dataContent.type === 'video' ? (
                    <PreviewContentVideo data={dataContent} />
                ) : (
                    <div className='w-full flex flex-col justify-start items-start' dangerouslySetInnerHTML={{ __html: dataContent.text }}>

                    </div>
                )
            }
        </>
    )
}

export default Preview
