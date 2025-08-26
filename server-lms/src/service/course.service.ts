import { CourseResponse, CourseType, toResponseCourse } from "../model/course-model";
import { CourseModel, CourseSchemas } from "../schema/courseSchema";



export class CourseService {
    // course service 
    static async get(req: { id: string }): Promise<CourseResponse[]> {
        const response = await CourseModel.find({
            manager: req.id
        })
            .select('name thumbnail')
            .populate({
                path: 'category',
                select: 'name -_id'
            })
            .populate({
                path: 'student',
                select: 'name -_id'
            })
            .lean<CourseResponse[]>();



        const result: CourseResponse[] = response.map(toResponseCourse);

        return result;

    }
}