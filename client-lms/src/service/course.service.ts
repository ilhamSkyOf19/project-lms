import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { CourseDetailResponse, CourseWithTotalStudent } from "../model/course-model";
import type { ResponseService } from "../types";

export class CourseService {
    // get 
    static async getAll(): Promise<ResponseService<CourseWithTotalStudent[]>> {
        try {
            const res = await AXIOS.get('/course');

            return res.data
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

    // get detail
    static async getDetail(id: string): Promise<ResponseService<CourseDetailResponse>> {
        try {
            // fetch
            const res = await AXIOS.get(`/course/${id}`).then(res => res.data);

            return res.data
        } catch (error) {
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
    static async create(data: FormData): Promise<ResponseService<{ message: string }>> {
        try {
            const res = await AXIOS.post('/course', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return res.data; // langsung return data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                return {
                    success: false,
                    message: error.response?.data?.message || 'bad request'
                };
            }

            return {
                success: false,
                message: 'something went wrong'
            };
        }
    }


    // update 
    static async update(data: FormData, id: string): Promise<ResponseService<{ message: string }>> {
        try {
            // fetch 
            const response = await AXIOS.put(`/course/${id}`, data).then(res => res.data);


            return response
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