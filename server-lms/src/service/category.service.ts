import { CategoryModel } from "../schema/courseSchema";

type CategoryType = {
    name: string;
    course: string[]
}
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
}