// create request 
export type CourseDetailContentRequest = {
    title: string;
    type: 'video' | 'text' | '';
    videoId?: string;
    text?: string;
}





// export response 
export type CourseDetailContentResponseType = {
    _id: string;
    title: string;
    type: 'video' | 'text';
    videoId: string;
    text: string;
    course: {
        _id: string
    }
}


// to response 
export const toCourseDetailResponse = (courseDetail: CourseDetailContentResponseType): CourseDetailContentResponseType => ({
    _id: courseDetail._id.toString(),
    title: courseDetail.title,
    type: courseDetail.type,
    videoId: courseDetail.videoId,
    text: courseDetail.text,
    course: courseDetail.course
})
