import { CourseResponse, CourseWithTotalStudent, toResponseCourse, UpdateRequest } from "../model/course-model";
import { CourseModel, } from "../schema/courseSchema";



export class CourseService {
    // course service 
    static async get(req: { id: string }): Promise<CourseWithTotalStudent[]> {
        const course = await CourseModel.find({
            manager: req.id
        })
            .select('name thumbnail category student')
            .populate({
                path: 'category',
                select: 'name -_id'
            })
            .populate({
                path: 'student',
                select: 'name -_id'
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

}