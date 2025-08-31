import { Request, Response } from "express";
import { CategoryResponseType } from "../model/category-model";
import { CourseService } from "../service/course.service";
import { CategoryService } from "../service/category.service";
import { ResponseService } from "../utils/type";
export class CategoryController {
    // get all name id 
    static async getAll(_: Request, res: Response<ResponseService<CategoryResponseType[]>>) {
        try {
            // response 
            const response = await CategoryService.getName();

            // return response 
            res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}