import z, { ZodType } from "zod";
import type { CourseDetailContentRequest } from "../model/courseDetail-model";

export class CourseDetailValidation {
    // create
    static readonly CREATE = z.object({
        title: z.string().min(3, 'Please input title course'),
        type: z.enum(['video', 'text', ''], { message: 'Please choose type course' }),
        videoId: z.string().default(''),
        text: z.string().default(''),
    }).strict() satisfies ZodType<CourseDetailContentRequest>

}