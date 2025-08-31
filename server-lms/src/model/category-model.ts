export type CategoryType = {
    name: string;
    course: string[]
}


export type CategoryResponseType = {
    _id: string;
    name: string;
}


// to response 
export const toCategoryResponse = (category: CategoryResponseType): CategoryResponseType => ({
    _id: category._id,
    name: category.name
})
