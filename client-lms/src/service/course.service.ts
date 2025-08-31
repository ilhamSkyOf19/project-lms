import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { CourseWithTotalStudent } from "../model/course-model";
import type { ResponseService } from "../types";

export class CourseService {
    // get 
    static async getAll(): Promise<ResponseService<CourseWithTotalStudent[]>> {
        try {
            return AXIOS.get('/course')
                .then(res => res.data)
        } catch (error) {
            console.log(error)
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