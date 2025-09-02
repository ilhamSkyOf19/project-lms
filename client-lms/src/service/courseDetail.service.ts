import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { CourseDetailContentRequest, CourseDetailContentResponseType } from "../model/courseDetail-model";
import type { ResponseService } from "../types";

export class CourseDetailService {
    // get course content 
    static async get(idCourse: string): Promise<ResponseService<CourseDetailContentResponseType>> {
        try {
            // response 
            const response = await AXIOS.get(`/course-detail/${idCourse}`).then(res => res.data);

            if (!response.success) {
                return {
                    success: false,
                    message: response.message
                }
            }

            return response
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

    // delete
    static async delete(idCourse: string, idCourseContent: string): Promise<{ success: boolean, message: string }> {
        try {
            // response 
            const response = await AXIOS.delete(`/course/${idCourse}/course-detail/${idCourseContent}`).then(res => res.data);

            if (!response.success) {
                return {
                    success: false,
                    message: response.message
                }
            }

            return {
                success: true,
                message: response.message
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

    // update 
    static async update(data: CourseDetailContentRequest, idCourse: string, idCourseContent: string): Promise<ResponseService<CourseDetailContentResponseType>> {
        try {
            // response 
            const response = await AXIOS.put(`/course/${idCourse}/course-detail/${idCourseContent}`, data).then(res => res.data);

            return {
                success: response.success,
                message: response.message,
                data: response.data ?? null, // pastikan backend kirim data terbaru
            };
        } catch (error) {
            console.log(error);
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