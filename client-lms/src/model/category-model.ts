export type CategoryResponse = {
    _id: string;
    name: string
}


// to response 
export const toCategoryResponse = (category: CategoryResponse): CategoryResponse => {
    return {
        _id: category._id,
        name: category.name
    }
}