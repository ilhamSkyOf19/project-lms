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

    // update course detail 
    static async update(req: CourseDetailRequest, idCourse: string, idCourseDetail: string): Promise<{ success: boolean, message: string }> {
        // find course 
        const findCourse = await CourseModel.findById(idCourse).lean<CourseResponse>();

        // find course detail 
        const findCourseDetail = await CourseDetailModel.findById(idCourseDetail).lean<CourseDetailResponseType>();

        // cek course
        if (!findCourseDetail) return {
            success: false,
            message: "Course detail not found"
        }

        // cek request 
        const isSame =
            findCourseDetail.title === req.title &&
            findCourseDetail.type === req.type &&
            ((findCourseDetail.videoId ? findCourseDetail.videoId === req.videoId : true) || (findCourseDetail.text ? findCourseDetail.text === req.text : true));

        // cek same
        if (isSame) {
            return {
                success: true,
                message: "Data not changed"
            }
        }

        // cek find course
        if (!findCourse) {
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
        await CourseDetailModel.findByIdAndUpdate(idCourseDetail, {
            ...req
        })

        return {
            success: true,
            message: "Success"
        }
    }


    // delete 
    static async async(idCourseDetail: string, idCourse: string): Promise<{ success: boolean, message: string }> {

        // cek course 
        const findCourse = await CourseModel.findById(idCourse).lean<CourseResponse>();

        // cek course 
        if (!findCourse) return {
            success: false,
            message: "Course not found"
        }


        // find course detail
        const findCourseDetail = await CourseDetailModel.findById(idCourseDetail).lean<CourseDetailResponseType>();

        // cek course detail
        if (!findCourseDetail) return {
            success: false,
            message: "Course detail not found"
        }

        // delete 
        await CourseDetailModel.findOneAndDelete({
            _id: idCourseDetail
        });

        return {
            success: true,
            message: "Success"
        }
    }
}