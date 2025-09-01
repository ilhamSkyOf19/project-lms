import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { CourseDetailContentRequest, CourseDetailContentResponseType } from "../model/courseDetail-model";
import type { ResponseService } from "../types";

export class CourseDetailService {
    // create 
    static async create(req: CourseDetailContentRequest, idCourse: string): Promise<ResponseService<CourseDetailContentResponseType>> {
        try {
            // response 
            const response = await AXIOS.post(`/course/${idCourse}/course-detail`, req).then(res => res.data);

            if (!response.success) {
                return {
                    success: false,
                    message: response.message
                }
            }

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.log(error);
            // return error response
            if (error instanceof AxiosError) {
                return error.response?.data
            }
            return {
                success: false,
                message: 'something went wrong'
            }
        }
    }
}