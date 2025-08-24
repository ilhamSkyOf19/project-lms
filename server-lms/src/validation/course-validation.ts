import zod, { ZodType } from "zod";
import { CourseRequestType } from "../model/course-model";
export class CourseValidation {
    // create 
    static readonly CREATE = zod.object({
        name: zod.string()
    }).strict() satisfies ZodType<CourseRequestType>
}