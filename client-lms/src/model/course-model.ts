

export type CourseRequest = {
    name: string;
    categoryId: string;
    description: string;
    tagline: string;
    thumbnail: File;
}


export type UpdateCourseRequest = {
    name?: string;
    categoryId?: string;
    description?: string;
    tagline?: string;
    thumbnail?: File;
}

export type UpdateRequest = CourseRequest & {
    thumbnail: string;
    manager: string
}


export type UpdateCourse = {
    name: string;
    thumbnail: string;
    category: string;
    tagline: string;
    description: string
}


export type CourseResponse = {
    _id: string;
    name: string;
    thumbnail: string;
    category: {
        name: string
    },
    student:
    {
        name: string
    }[],
    details: {
        _id: string
        title: string
        type: 'video' | 'text'
        videoId?: string
        text?: string
    }[],
    description: string;
    tagline: string
}

export type CourseWithTotalStudent = CourseResponse & {
    total_student: number;
    thumbnail_url: string
}


export const toResponseCourse = (course: CourseWithTotalStudent): CourseWithTotalStudent => ({
    _id: course._id,
    name: course.name,
    thumbnail: course.thumbnail,
    category: course.category,
    student: course.student,
    description: course.description,
    tagline: course.tagline,
    total_student: course.total_student,
    thumbnail_url: course.thumbnail_url,
    details: course.details
})


// course detail 
export type CourseDetailResponse = {
    _id: string;
    name: string;
    thumbnail: string;
    category: {
        _id: string
        name: string
    },
    student:
    {
        name: string
    }[],
    details: {
        _id: string
        title: string
        type: 'video' | 'text'
        videoId?: string
        text?: string
    }[],
    description: string;
    tagline: string
    total_student: number;
    thumbnail_url: string
}


export const toResponseCourseDetail = (course: CourseDetailResponse): CourseDetailResponse => ({
    _id: course._id,
    name: course.name,
    thumbnail: course.thumbnail,
    category: course.category,
    student: course.student,
    description: course.description,
    tagline: course.tagline,
    total_student: course.total_student,
    thumbnail_url: course.thumbnail_url,
    details: course.details
})



