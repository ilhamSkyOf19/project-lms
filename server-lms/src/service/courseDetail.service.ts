import { CourseResponse } from "../model/course-model";
import { CourseDetailRequest, CourseDetailResponseType, toCourseDetailResponse } from "../model/courseDetail-model";
import { CourseDetailModel, CourseModel } from "../schema/courseSchema";

export class CourseDetailService {
    // get 
    static async getAll(): Promise<CourseDetailResponseType[]> {
        const response = await CourseDetailModel.find().lean<CourseDetailResponseType[]>();

        return response
    }

    // create 
    static async create(req: CourseDetailRequest, idCourse: string): Promise<{ success: boolean, message: string }> {
        //  find course 
        const course = await CourseModel.findById(idCourse).lean<CourseResponse>();

        // cek find course
        if (!course) {
            return {
                success: false,
                message: "Course not found"
            }
        }

        // cek vid & teks
        if (!req.videoId && !req.text) {
            return {
                success: false,
                message: "Video and teks is required"
            }
        }

        // cek match type text
        if (req.type === 'video' && !req.videoId) {
            return {
                success: false,
                message: "Video is required"
            }
        }

        // cek match type video
        if (req.type === 'text' && !req.text) {
            return {
                success: false,
                message: "Teks is required"
            }
        }



        // create 
        const response = await CourseDetailModel.create({
            ...req,
            course: idCourse
        });

        // update course 
        await CourseModel.findByIdAndUpdate(idCourse, {
            $push: {
                details: response._id
            }
        })


        return {
            success: true,
            message: "Success"
        }

    }
}