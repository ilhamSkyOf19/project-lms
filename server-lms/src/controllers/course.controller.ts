import { Request, Response } from "express";
import { CourseRequest, CourseResponse } from "../model/course-model";
import { CourseService } from "../service/course.service";
import { AuthRequest } from "../model/user-model";
import { ResponseService } from "../utils/type";
import { CourseValidation } from "../validation/course-validation";
import { deleteFile } from "../utils/deleteFile";



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

    // create course 
    static async create(req: Request<{}, {}, CourseRequest>, res: Response<ResponseService<CourseResponse>>) {
        try {
            // get req
            const body = req.body;
            const parse = CourseValidation.CREATE.safeParse(body);

            // get id 
            const { id } = (req as AuthRequest).data;


            // cek validation
            if (!parse.success) {
                // hapus file
                if (req.file) await deleteFile(req.file.path);
                // error zod
                const errorMassage: string = parse.error.issues.map((err) => err.message)[0] || 'Internal Server Error';

                return res.status(500).json({
                    success: false,
                    message: errorMassage
                });
            }

            // cek category
            const category = await CourseService.get({ id: parse.data.categoryId });

            // cek category 
            if (!category) return res.status(400).json({ success: false, message: "Category not found" });






        } catch (error) {

        }
    }
}