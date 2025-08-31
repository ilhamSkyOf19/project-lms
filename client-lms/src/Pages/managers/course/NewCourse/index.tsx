import { useEffect, useRef, useState, type ChangeEvent, type FC } from 'react'
import HeaderContentDashboard from '../../../../components/HeaderContentDahsboard'
import ButtonBorder from '../../../../components/ButtonBorder'
import BoxInputData from '../../../../components/BoxInputData'
import BoxInputChoose from '../../../../components/BoxInputChoose'
import ButtonPurple from '../../../../components/ButtonPurple'
import ButtonTrash from '../../../../components/ButtonTrash'
import clsx from 'clsx'
import type { CategoryResponse } from '../../../../model/category-model'
import { CategoryService } from '../../../../service/category.service'
import { useForm, type FieldError, type UseFormRegisterReturn, type UseFormResetField, type UseFormSetValue } from 'react-hook-form'
import type { CourseRequest, UpdateCourseRequest } from '../../../../model/course-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { CourseValidation } from '../../../../validation/course-validation'
import ErrorMessage from '../../../../components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { CourseService } from '../../../../service/course.service'
import { useNavigate } from 'react-router'

const NewCourse: FC = () => {


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


    // use form 
    const { register, handleSubmit, formState: { errors }, setValue, resetField } = useForm<CourseRequest>({
        defaultValues: {
            name: '',
            categoryId: '',
            description: '',
            tagline: '',
        },
        resolver: zodResolver(CourseValidation.CREATE)
    });

    // handle mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: FormData) => CourseService.create(data)
    })





    // handle submit
    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     const formData = new FormData(event.currentTarget);
    //     const file = formData.get("thumbnail") as File;

    //     if (file.name === '') {
    //         setThumbnailEmpty(true);
    //         return;
    //     }

    //     console.log(file);
    // }

    const onSubmit = async (data: CourseRequest) => {
        if (!data) return;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('categoryId', data.categoryId);
        formData.append('description', data.description);
        formData.append('tagline', data.tagline);
        formData.append('thumbnail', data.thumbnail);

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
                    <InputThumbnail register={register("thumbnail")} error={errors.thumbnail} setValue={setValue} resetField={resetField} />

                    {/* tagline */}
                    <BoxInputData type='text' name='tagline' icon='bill-black.svg' label='course tagline' placeholder='Write tagline for better copy' register={register("tagline")} error={errors.tagline} />

                    {/* category */}
                    <BoxInputChoose name='categoryId' icon='bill-black.svg' label='select category' value={category?.name || ''} chooses={categoryOption} handleOnChange={handleCategory} placeholder='Choose one category' register={register("categoryId")} error={errors.categoryId} setValue={setValue as UseFormSetValue<CourseRequest>} />

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


// thumbnail

type PropsInputThumbnail = {
    register: UseFormRegisterReturn;
    error?: FieldError;
    setValue: UseFormSetValue<CourseRequest>;
    resetField: UseFormResetField<CourseRequest>
}

const InputThumbnail: FC<PropsInputThumbnail> = ({ register, error, setValue, resetField }) => {
    // state preview
    const [preview, setPreview] = useState<string>('');
    // ref input thumbnail
    const refInputThumb = useRef<HTMLInputElement>(null);



    // handle input thumb
    const handleChangeInputImg = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setValue('thumbnail', file);

        }
    }
    // handle click input thumb
    const handleClickInputThumb = () => {
        refInputThumb.current?.click();
    }

    // handle reset input img
    const handleResetInputImg = () => {
        if (refInputThumb.current) {
            refInputThumb.current.value = '';
            setPreview('');
            resetField('thumbnail');
        }
    }



    return (
        <div className='w-full flex flex-col justify-start items-start gap-3'>
            {/* label */}
            <label className='font-semibold text-md text-black'>Add a Thumbnail</label>
            {/* input hidden */}
            <input
                {...register}
                ref={refInputThumb}
                type='file'
                name='thumbnail'
                id='thumbnail'
                accept='image/*'
                className='hidden'
                onChange={handleChangeInputImg}
            />
            <div className={clsx(
                'w-full h-[14rem] flex flex-row justify-center items-center gap-3 relative border rounded-3xl overflow-hidden transition-all duration-200',
                error ? 'border-red-500 ring-1 ring-red-500' : 'border-[#CFDBEF]'
            )}>
                {
                    preview === '' ? (
                        <button type='button' className='w-full h-[14rem] flex flex-row justify-center items-center gap-3' onClick={handleClickInputThumb}>
                            {/* icon */}
                            <img src='/assets/images/icons/gallery-add-black.svg' className='w-6.5 h-6.5' alt='icon' />
                            {/* placeholder */}
                            <p className='text-md text-[#6B6C7F]'>Add an attachment</p>
                        </button>
                    ) : (
                        <div className='w-full h-full overflow-hidden relative'>
                            <img src={preview} className='w-full h-full object-cover' loading='lazy' alt='thumbnail' />

                            {/* trash */}
                            <div className='absolute right-3 bottom-3'>
                                <ButtonTrash handleOnClick={handleResetInputImg} />
                            </div>
                        </div>
                    )
                }
            </div>
            {/* error message */}
            <div className='min-h-7'>
                <ErrorMessage error={error?.message} />
            </div>

        </div>
    )
}



export default NewCourse
