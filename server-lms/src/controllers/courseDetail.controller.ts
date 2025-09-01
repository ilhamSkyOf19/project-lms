import { Request, Response } from 'express'
import { ResponseService } from '../utils/type';
import { CourseDetailService } from '../service/courseDetail.service';
import { CourseDetailRequest } from '../model/courseDetail-model';
import { CourseResponseDetail } from '../model/course-model';

export class CourseDetailController {
    // get all
    static async getAll(_: Request, res: Response<ResponseService<CourseDetailController[]>>) {
        try {
            // responnse 
            const response = await CourseDetailService.getAll();

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

    // create 
    static async create(req: Request<{ id: string }, {}, CourseDetailRequest>, res: Response<ResponseService<CourseResponseDetail | string>>) {
        try {
            // get params 
            const idCourse = req.params.id;

            // get body
            const body = req.body;


            // response 
            const response = await CourseDetailService.create(body, idCourse);

            if (!response.success) return res.status(400).json({
                success: false,
                message: response.message
            });

            // return response 
            return res.status(200).json({
                success: true,
                data: response.message
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
