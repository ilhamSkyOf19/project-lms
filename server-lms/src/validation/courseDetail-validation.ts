import z, { ZodType } from "zod";
import { CourseDetailRequest } from "../model/courseDetail-model";

// course detail validation
export class CourseDetailValidation {
    // create 
    static readonly CREATE = z.object({
        title: z.string(),
        type: z.enum(['video', 'text']),
        videoId: z.string().optional().default(""),
        text: z.string().optional().default(""),
        course: z.object({
            _id: z.string()
        }).optional()
    }).strict() satisfies ZodType<CourseDetailRequest>
}