import z, { ZodType } from "zod";
import { CourseRequest } from "../model/course-model";

export class CourseValidation {
    // create 
    static readonly CREATE = z.object({
        name: z.string().min(3),
        categoryId: z.string(),
        tagline: z.string(),
        description: z.string()
    }).strict() satisfies ZodType<CourseRequest>
}