import type { CourseDetailResponse } from "../model/course-model";
import { CourseService } from "../service/course.service";
import type { ResponseService } from "../types";

const loaderCourseAll = async (): Promise<ResponseService<CourseDetailResponse[]>> => {
    try {

        // response 
        const response = await CourseService.getAll();


        if (!response.success) {
            return response
        }

        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}


export default loaderCourseAll;