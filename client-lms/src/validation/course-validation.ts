import z, { ZodType } from "zod";
import type { CourseRequest, UpdateCourseRequest } from "../model/course-model";

export class CourseValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().min(3, 'Please input name course'),
        categoryId: z.string().min(3, 'Please choose category course'),
        description: z.string().min(3, 'Please input description course'),
        tagline: z.string().min(3, 'Please input tagline course'),
        thumbnail: z.any().refine((file) => file?.name, { message: 'Please input thumbnail course' }),

    }).strict() satisfies ZodType<CourseRequest>;


    // update 
    static readonly UPDATE = z.object({
        name: z.string().min(3, 'Please input name course').optional(),
        categoryId: z.string().min(3, 'Please choose category course').optional(),
        description: z.string().min(3, 'Please input description course').optional(),
        tagline: z.string().min(3, 'Please input tagline course').optional(),
        thumbnail: z.any().refine((file) => file?.name, { message: 'Please input thumbnail course' }).optional(),

    }).strict() satisfies ZodType<UpdateCourseRequest>;
}