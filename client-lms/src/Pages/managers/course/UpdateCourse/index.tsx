import { useEffect, useState, type FC } from 'react'
import HeaderContentDashboard from '../../../../components/HeaderContentDahsboard'
import ButtonBorder from '../../../../components/ButtonBorder'
import BoxInputData from '../../../../components/BoxInputData'
import BoxInputChoose from '../../../../components/BoxInputChoose'
import ButtonPurple from '../../../../components/ButtonPurple'
import type { CategoryResponse } from '../../../../model/category-model'
import { CategoryService } from '../../../../service/category.service'
import { useForm } from 'react-hook-form'
import type { CourseDetailResponse, UpdateCourseRequest } from '../../../../model/course-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { CourseValidation } from '../../../../validation/course-validation'
import { useMutation } from '@tanstack/react-query'
import { CourseService } from '../../../../service/course.service'
import { useLoaderData, useNavigate } from 'react-router'
import BoxInputThumbnail from '../../../../components/BoxInputThumbnail'

const UpdateCourse: FC = () => {

    // data 
    const data = useLoaderData() as CourseDetailResponse;

    // state input
    const [category, setCategory] = useState<CategoryResponse | null>(null);

    // category
    const [categoryOption, setCategoryOption] = useState<CategoryResponse[]>([]);


    // navigate 
    const navigate = useNavigate();


    // get category 
    useEffect(() => {
        const fetch = async () => {
            const response = await CategoryService.getAll()
            if (response.success) {
                setCategoryOption(response.data)
            } else {
                console.log(response.message)
            }
        }

        fetch()
    }, [])


    // handle category 
    const handleCategory = (option: CategoryResponse) => {
        setCategory(option);
    }

    // set category
    useEffect(() => {
        if (data) {
            setCategory(data.category);
        } else {
            setCategory(null);
        }
    }, [data])

    // use form 
    const { register, handleSubmit, formState: { errors }, setValue, resetField } = useForm<UpdateCourseRequest>({
        defaultValues: {
            name: data ? data.name : '',
            categoryId: data ? data.category._id : '',
            description: data ? data.description : '',
            tagline: data ? data.tagline : '',
        },
        resolver: zodResolver(CourseValidation.UPDATE)
    });

    // handle mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (datas: FormData) => CourseService.update(datas, data._id)
    })



    const onSubmit = async (data: UpdateCourseRequest) => {

        const formData = new FormData();


        if (data.name) formData.append("name", data.name);
        if (data.categoryId) formData.append("categoryId", data.categoryId);
        if (data.description) formData.append("description", data.description);
        if (data.tagline) formData.append("tagline", data.tagline);
        if (data.thumbnail instanceof File) formData.append("thumbnail", data.thumbnail);


        const response = await mutateAsync(formData);

        if (response.success) {
            // reset form
            resetField('name');
            resetField('categoryId');
            resetField('description');
            resetField('tagline');
            resetField('thumbnail');

            // redirect
            navigate('/manager/course')
        } else {
            // console.log('error', response.message);
            alert(response.message);
        }



    }





    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* header */}
            <HeaderContentDashboard header='new course' desc='Create new future for company'>
                {/* button import from BWA */}
                <ButtonBorder label='import from BWA' />
            </HeaderContentDashboard>

            {/* content */}
            <div className='bg-[#F8FAFB] w-[60%] flex flex-col justify-start items-center p-8 rounded-3xl overflow-x-hidden gap-12'>
                {/* form add */}
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-start items-start gap-2'>
                    {/* input course name */}
                    <BoxInputData type='text' name='name' icon='note-favorite-black.svg' label='course name' placeholder='Write better name for your course' register={register("name")} error={errors.name} />

                    {/* add thummbnail */}
                    <BoxInputThumbnail register={register("thumbnail")} error={errors.thumbnail} setValue={setValue} resetField={resetField} thumbnail={data && data.thumbnail_url} />

                    {/* tagline */}
                    <BoxInputData type='text' name='tagline' icon='bill-black.svg' label='course tagline' placeholder='Write tagline for better copy' register={register("tagline")} error={errors.tagline} />

                    {/* category */}
                    <BoxInputChoose name='categoryId' icon='bill-black.svg' label='select category' value={category?.name || ''} chooses={categoryOption} handleOnChange={handleCategory} placeholder='Choose one category' register={register("categoryId")} error={errors.categoryId} setValue={setValue} />

                    {/* text area */}
                    <BoxInputData type='textarea' name='description' icon='note-black.png' label='description' placeholder='Write better description for your course' register={register("description")} error={errors.description} />

                    {/* button */}
                    <div className='w-full flex flex-row justify-between items-center gap-4'>
                        <ButtonBorder label='Save as Draft' width={'full'} type='button' />
                        <ButtonPurple label='create now' width={'full'} type='submit' disabled={isPending} />
                    </div>
                </form>

            </div>
        </div>
    )
}



export default UpdateCourse
