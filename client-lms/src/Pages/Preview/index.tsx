import { useEffect, useState, type FC } from 'react'
import type { DataContent, DataCourse } from '../../types'
import { useParams } from 'react-router';

import course from '../../jsons/course.json'
import PreviewContentVideo from '../../components/PreviewContentVideo';


const Preview: FC = () => {
    // state data content
    const [dataContent, setDataContent] = useState<DataContent | undefined>(undefined)


    // get params
    const { id, idContent } = useParams() as { id: string, idContent: string };

    // get data content 
    useEffect(() => {
        if (id && idContent && course) {
            const getContent = (course as DataCourse[])
                .find((item) => item.id === id)
                ?.contentList
                .find((item) => item.id === idContent)

            if (getContent) {
                setDataContent(getContent);
            }
        }
    }, [id, idContent])



    return (
        <>
            {
                dataContent && dataContent.category === 'video' ? (
                    <PreviewContentVideo data={dataContent} />
                ) : (
                    <p>content teks</p>
                )
            }
        </>
    )
}

export default Preview
