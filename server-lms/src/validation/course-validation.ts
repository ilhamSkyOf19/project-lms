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

    // update 
    static readonly UPDATE = this.CREATE.partial() as ZodType<CourseRequest>


    // delete 
    static readonly DELETE = z.object({
        id: z.string()
    }).strict() satisfies ZodType<{ id: string }>
}