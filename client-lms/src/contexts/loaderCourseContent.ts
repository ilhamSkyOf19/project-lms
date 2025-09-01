import type { CourseDetailContentResponseType } from "../model/courseDetail-model";
import { CourseDetailService } from "../service/courseDetail.service"

export const loaderCourseContent = async (idCourseContent: string): Promise<CourseDetailContentResponseType | { success: boolean, message: string }> => {
    try {

        // response 
        const response = await CourseDetailService.get(idCourseContent);


        if (!response.success) {
            return {
                success: false,
                message: response.message
            }
        }

        return response.data

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}