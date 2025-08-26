import { Request, Response } from "express";
import { CourseResponse } from "../model/course-model";
import { CourseService } from "../service/course.service";
import { AuthRequest } from "../model/user-model";
import { ResponseService } from "../utils/type";



export class CourseController {

    // get course 
    static async get(req: Request, res: Response<ResponseService<CourseResponse[]>>) {
        try {
            // get id 
            const { id } = (req as AuthRequest).data;

            // get course 
            const response = await CourseService.get({ id });

            return res.status(200).json({
                success: true,
                data: response
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}