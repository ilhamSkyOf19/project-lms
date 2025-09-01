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


    // get detail 
    static async getDetail(req: Request<{ id: string }>, res: Response<ResponseService<CourseDetailController>>) {
        try {
            // get params 
            const { id } = req.params;

            // response 
            const response = await CourseDetailService.getDetail(id);

            if (!response) {
                return res.status(400).json({
                    success: false,
                    message: "Data not found"
                })
            }

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

            // cek response
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


    // update
    static async update(req: Request<{ idCourse: string, idCourseDetail: string }, {}, CourseDetailRequest>, res: Response<ResponseService<CourseResponseDetail | string>>) {
        try {
            // get params 
            const { idCourse, idCourseDetail } = req.params;

            // req body 
            const body = req.body;

            // response 
            const response = await CourseDetailService.update(body, idCourse, idCourseDetail);

            // cek response
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

    // delete 
    static async delete(req: Request<{ idCourseDetail: string, idCourse: string }>, res: Response<{ success: boolean, message: string }>) {
        try {
            // get params 
            const { idCourseDetail, idCourse } = req.params;

            // response
            const response = await CourseDetailService.async(idCourseDetail, idCourse);

            if (!response.success) return res.status(400).json({
                success: false,
                message: response.message
            });
            // return response 
            return res.status(200).json({
                success: true,
                message: "Success"
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
