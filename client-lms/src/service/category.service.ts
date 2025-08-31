import { AxiosError } from "axios";
import AXIOS from "../lib/axios";
import type { CategoryResponse } from "../model/category-model";
import type { ResponseService } from "../types";

export class CategoryService {
    // get all
    static async getAll(): Promise<ResponseService<CategoryResponse[]>> {
        try {
            return AXIOS.get('/category').then(res => res.data)
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