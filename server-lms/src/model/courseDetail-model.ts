// create request 
export type CourseDetailRequest = {
    title: string;
    type: 'video' | 'text';
    videoId?: string;
    text?: string;
}





// export response 
export type CourseDetailResponseType = {
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
export const toCourseDetailResponse = (courseDetail: CourseDetailResponseType): CourseDetailResponseType => ({
    _id: courseDetail._id.toString(),
    title: courseDetail.title,
    type: courseDetail.type,
    videoId: courseDetail.videoId,
    text: courseDetail.text,
    course: courseDetail.course
})
