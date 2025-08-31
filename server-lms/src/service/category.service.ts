import { CategoryResponseType, CategoryType, toCategoryResponse } from "../model/category-model";
import { toResponseCourse } from "../model/course-model";
import { CategoryModel } from "../schema/courseSchema";



export class CategoryService {
    // cek 
    static async get(id: string): Promise<CategoryType | null> {

        const response = await CategoryModel.findById(id).lean<CategoryType>();

        if (!response) return null

        return response
    }


    // category update 
    static async update(id: string, course: string): Promise<CategoryType | null> {
        const response = await CategoryModel.findByIdAndUpdate(id, { $push: { courses: course } }, { new: true }).lean<CategoryType>();
        return response
    }


    // get all category 
    static async getName(): Promise<CategoryResponseType[]> {
        const response = await CategoryModel.find().lean<CategoryResponseType[]>();
        return response.map(toCategoryResponse);
    }
}