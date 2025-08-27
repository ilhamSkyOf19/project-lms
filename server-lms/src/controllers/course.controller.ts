import { Response, Request } from "express";
import { CourseRequest, CourseWithTotalStudent, UpdateCourse } from "../model/course-model";
import { CourseService } from "../service/course.service";
import { AuthRequest } from "../model/user-model";
import { ResponseService } from "../utils/type";
import { CourseValidation } from "../validation/course-validation";
import { deleteFile } from "../utils/deleteFile";
import { CourseModel } from "../schema/courseSchema";
import { CategoryService } from "../service/category.service";
import { UserService } from "../service/user.service";
import { FileService } from "../service/file.service";




export class CourseController {

    // get course 
    static async get(req: AuthRequest, res: Response<ResponseService<CourseWithTotalStudent[]>>) {
        try {
            // get id 
            const id = req.data?.id || '';

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
    static async create(req: AuthRequest, res: Response<ResponseService<{ message: string }>>) {
        try {
            // get req
            const body = req.body;

            // cek validation 
            const parse = CourseValidation.CREATE.safeParse(body);

            // get id 
            const id = req.data?.id || '';



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
            const category = await CategoryService.get(parse.data.categoryId);

            // cek category 
            if (!category) return res.status(400).json({ success: false, message: "Category not found" });

            // course model
            const course = new CourseModel({
                name: parse.data.name,
                thumbnail: req.file?.filename,
                tagline: parse.data.tagline,
                category: parse.data.categoryId,
                description: parse.data.description,
                manager: id
            });

            // save course 
            await course.save();

            // update category model 
            await CategoryService.update(parse.data.categoryId, course.id);

            // update user model 
            await UserService.update(id, course.id);


            return res.status(201).json({
                success: true,
                data: {
                    message: "Course created successfully"
                }
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }


    // update course 
    static async update(req: AuthRequest, res: Response<ResponseService<{ message: string }>>) {
        try {
            // get body
            const body = req.body as CourseRequest;
            // cek validation 
            const parse = CourseValidation.UPDATE.safeParse(body);
            // get id
            const courseId = req.params.id;

            // get id 
            const id = req.data?.id;




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
            const category = await CategoryService.get(parse.data.categoryId);
            const oldCourse = await CourseModel.findById(courseId);

            // cek category 
            if (!category || !oldCourse) return res.status(400).json({ success: false, message: "Data not found" });




            await CourseModel.findByIdAndUpdate(courseId, {
                name: parse.data.name,
                thumbnail: req.file ? req.file?.filename : oldCourse.thumbnail,
                tagline: parse.data.tagline,
                category: parse.data.categoryId,
                description: parse.data.description,
                manager: id
            })


            // hapus thumbnail 
            if (req.file) await FileService.deleteFile("course", oldCourse.thumbnail);


            return res.status(200).json({
                success: true,
                data: {
                    message: "Course updated successfully"
                }
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }


    // delete course 
    static async delete(req: Request<{ id: string }>, res: Response<ResponseService<{ message: string }>>) {
        try {

            // get id
            const id = req.params.id;
            // cek course 
            const course = await CourseModel.findById(id) as UpdateCourse;

            // hapus file 
            await FileService.deleteFile("course", course.thumbnail);

            // delete file 
            await CourseModel.findOneAndDelete({ _id: id });

            return res.status(200).json({
                success: true,
                data: {
                    message: "Course deleted successfully"
                }
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

}