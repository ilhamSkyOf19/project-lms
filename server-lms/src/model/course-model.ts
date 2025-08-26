
import { Document, Types } from "mongoose";
import { UserResponseType } from "./user-model";


export type CourseType = {
    id: string;
    name: string;
    thumbnail: string;
    category: CategoryType;
    tagline: string;
    description: string;
    student: UserResponseType;
    manager: UserResponseType;
    details: CourseDetailType;
};


export type CategoryType = {
    id: string;
    course: CourseType[];
};

export type CourseDetailType = {
    id: string;
    title: string;
    type: "video" | "text";
    videoId: string;
    text: string;
    course: CourseType[]; // optional, karena bisa populate
};

export type CourseResponse = {
    _id: string;
    name: string;
    thumbnail: string;
    category: [
        {
            name: string
        }
    ],
    student: [
        {
            name: string
        }
    ]
}


export const toResponseCourse = (course: CourseResponse): CourseResponse => ({
    _id: course._id,
    name: course.name,
    thumbnail: course.thumbnail,
    category: course.category,
    student: course.student
})