import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { CourseDetailResponse } from "../model/course-model";
import type { ResponseService } from "../types";

export class CourseService {
    // get 
    static async getAll(): Promise<ResponseService<CourseDetailResponse[]>> {
        try {
            const res = await AXIOS.get('/course').then(res => res.data);

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

    static async getDetailSidebar(id: string): Promise<ResponseService<CourseDetailResponse>> {
        try {
            const res: ResponseService<CourseDetailResponse> = await AXIOS.get(`/course/${id}`).then(res => res.data);
            return res; // ⬅️ cukup ini
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.data as ResponseService<CourseDetailResponse>;
            }

            return {
                success: false,
                message: 'something went wrong',
            } as ResponseService<CourseDetailResponse>;
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

    // delete 
    static async delete(id: string): Promise<ResponseService<{ message: string }>> {
        try {
            // response 
            const response = await AXIOS.delete(`/course/${id}`).then(res => res.data);

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