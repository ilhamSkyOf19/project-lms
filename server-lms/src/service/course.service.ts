import { CourseResponse, CourseResponseDetail, CourseWithTotalStudent, toResponseCourse, toResponseCourseDetail, UpdateRequest } from "../model/course-model";
import { CourseModel, } from "../schema/courseSchema";



export class CourseService {
    // course service 
    static async get(req: { id: string }): Promise<CourseWithTotalStudent[]> {
        const course = await CourseModel.find({
            manager: req.id
        })
            .select('name thumbnail category student description tagline')
            .populate({
                path: 'category',
                select: 'name -_id'
            })
            .populate({
                path: 'student',
                select: 'name -_id'
            })
            .populate({
                path: 'details',
                select: '_id title type videoId text'
            })
            .lean<CourseResponse[]>();


        // img url 
        const imgUrl = process.env.BASE_URL + "/uploads/course/";
        const response = course.map((item) => {
            return {
                ...item,
                thumbnail_url: imgUrl + item.thumbnail,
                student: item.student || [],
                total_student: item.student?.length || 0
            }
        })



        const result: CourseWithTotalStudent[] = response.map(toResponseCourse);
        return result;
    }



    // course service 
    static async getDetail(req: { id: string }): Promise<CourseResponseDetail> {
        const course = await CourseModel.findById({
            _id: req.id
        })
            .select('name thumbnail category student description tagline')
            .populate({
                path: 'category',
                select: '_id name'
            })
            .populate({
                path: 'student',
                select: 'name -_id'
            })
            .populate({
                path: 'details',
                select: '_id title type videoId text',
            })
            .lean<CourseResponseDetail>();

        // cek course 
        if (!course) {
            throw new Error("Course not found");
        }


        // img url 
        const imgUrl = process.env.BASE_URL + "/uploads/course/";
        const response = {
            ...course,
            thumbnail_url: imgUrl + course?.thumbnail,
            student: course?.student || [],
            total_student: course?.student?.length || 0
        }


        const result: CourseResponseDetail = toResponseCourseDetail(response);
        return result;
    }

}