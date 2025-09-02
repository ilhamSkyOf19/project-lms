import { useEffect, useRef, useState, type FC } from 'react'
import LinkRoute from '../../../../components/LinkRoute'
import { useLoaderData, useNavigate, useParams } from 'react-router'
import BoxInputData from '../../../../components/BoxInputData'
import ButtonBorder from '../../../../components/ButtonBorder'
import ButtonPurple from '../../../../components/ButtonPurple'

import { Editor } from '@tinymce/tinymce-react';
import type { CourseDetailResponse } from '../../../../model/course-model'
import { useForm, type FieldError, type UseFormRegisterReturn, type UseFormSetValue } from 'react-hook-form'
import clsx from 'clsx'
import ErrorMessage from '../../../../components/ErrorMessage'
import type { CourseDetailContentRequest, CourseDetailContentResponseType } from '../../../../model/courseDetail-model'
import { zodResolver } from '@hookform/resolvers/zod'
import { CourseDetailValidation } from '../../../../validation/courseDetail-validation'
import { useMutation } from '@tanstack/react-query'
import { CourseDetailService } from '../../../../service/courseDetail.service'


const AddContentCourse: FC = () => {

    // get use loader 
    const { Course, CourseContent } = useLoaderData() as {
        Course: CourseDetailResponse,
        CourseContent: CourseDetailContentResponseType
    };








    const [contentType, setContentType] = useState<'video' | 'text' | "">('');

    // get params
    const { id } = useParams() as { id: string };

    // navigate 
    const navigate = useNavigate();





    // handle content type 
    const handleContentType = (option: 'video' | 'text' | '') => {
        setContentType(option);
    }

    useEffect(() => {

        if (CourseContent) {
            setContentType(CourseContent.type);
        }

    }, [CourseContent])


    // use form 
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CourseDetailContentRequest>({
        defaultValues: {
            text: CourseContent ? CourseContent.text : '',
            title: CourseContent ? CourseContent.title : '',
            type: CourseContent ? CourseContent.type : '',
            videoId: CourseContent ? CourseContent.videoId : '',
        },
        resolver: zodResolver(CourseDetailValidation.CREATE)

    })

    // handle mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: CourseDetailContentRequest) => (CourseContent
            ? CourseDetailService.update(data, Course._id, CourseContent._id)
            : CourseDetailService.create(data, Course._id)
        ),

        onSuccess: (res) => {
            if (res.success) {
                navigate(`/manager/course/manage-course-materi/${id}`);

                // reset form
                setValue('text', '');
                setValue('title', '');
                setValue('type', '');
                setValue('videoId', '');
            } else {
                console.warn("⚠️ Gagal:", res.message);
            }
        },
        onError: (err) => {
            console.error("❌ Error:", err);
        }
    })


    // On Submit 
    const onSubmit = (data: CourseDetailContentRequest) => {
        mutateAsync(data);

    }


    console.log(Course)






    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* link route */}
            <LinkRoute link={[
                { link: '/manager', label: 'dashboard' },
                { link: `/manager/course/manage-course-materi/${id}`, label: 'manage course' },
                { link: `/manager/course/manage-course-materi/${id}/add-content`, label: 'add content' }]} />

            {/* preview thumb course  */}
            <div className='w-full h-[6.5rem] flex flex-row justify-start items-center gap-6'>
                {/* thumb */}
                <div className='w-[9rem] h-full rounded-3xl overflow-hidden'>
                    <img src={`${Course?.thumbnail_url}`} alt="thumb course" className='w-full h-full object-cover' loading='lazy' />
                </div>
                {/* text */}
                <div className='h-full flex flex-col justify-center items-start gap-1.5'>
                    {/* title */}
                    <h2 className='font-extrabold text-3xl capitalize'>
                        add content
                    </h2>
                    <p className='text-slate-500 font-md'>Give a best content for the course</p>
                </div>
            </div>

            {/* content input */}
            <div className='bg-[#F8FAFB] w-full flex flex-col justify-start items-center p-8 rounded-3xl overflow-x-hidden'>
                {/* input */}
                <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex flex-col justify-start items-start gap-8'>
                    {/* content title */}
                    <BoxInputData icon='note-favorite-black.svg' label='Content Title' type='text' placeholder='Write better name for your course' name='title' register={register('title')} error={errors.title} />

                    {/* input content type */}
                    <BoxInputChooseAddContent name='type' choose={['video', 'text']} icon='crown-black.svg' label='select type' value={contentType ?? ''} handleOnChange={handleContentType} placeholder='Choose content type' setValue={setValue} register={register('type')} error={errors.type} />

                    {
                        contentType === 'video' ? (

                            <BoxInputData icon='bill-black.svg' label='Youtube Video ID' type='text' placeholder='Write tagline for better copy' name='videoId' register={register('videoId')} error={errors.videoId} />
                        ) : contentType === 'text' ? (
                            <div className='w-full flex flex-col justify-start items-start gap-4'>
                                <label className='text-md text-black font-semibold capitalize'>
                                    content text
                                </label>
                                <Editor
                                    apiKey={`${import.meta.env.VITE_API_TINYMCE_KEY?.trim()}`}
                                    init={{
                                        height: 400,
                                        width: "100%",
                                        menubar: false,
                                        plugins: 'lists link image table code codesample image',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | code | codesample | image',
                                        placeholder: "Write your content text...",
                                        codesample_languages: [
                                            { text: 'PHP', value: 'php' },
                                            { text: 'JavaScript', value: 'javascript' },
                                            { text: 'HTML/XML', value: 'markup' }
                                        ]
                                    }}
                                    onEditorChange={(content) => setValue('text', content)}
                                />
                            </div>

                        ) : (
                            <div className='w-full' />
                        )
                    }

                    {/* button */}
                    <div className='w-full flex flex-row justify-center items-center gap-4'>
                        {/* save as draft */}
                        <ButtonBorder label='save as draft' width='full' type='button' />
                        {/* add content */}
                        <ButtonPurple label='add content now' width='full' type='submit' disabled={isPending} />
                    </div>
                </form>

            </div>
        </div>
    )
}


type Props = {
    name: string;
    icon: string;
    label: string;
    value: 'video' | 'text' | '';
    placeholder: string;
    register: UseFormRegisterReturn;
    handleOnChange: (option: 'video' | 'text') => void
    error?: FieldError;
    setValue: UseFormSetValue<CourseDetailContentRequest>;
    choose: ['video', 'text'];
}
const BoxInputChooseAddContent: FC<Props> = ({ icon, name, label, value, placeholder, register, error, setValue, choose, handleOnChange }) => {
    // state option
    const [optionActive, setOptionActive] = useState<boolean>(false);
    // ref option & ref input & ref button arrow down
    const inputRef = useRef<HTMLInputElement>(null);
    const optionRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);



    // handle outside click option
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (optionRef.current && !optionRef.current.contains(target) && inputRef.current && !inputRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
                setOptionActive(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [optionRef])


    return (
        <div className='w-full flex flex-col justify-start items-start gap-1'>
            {/* label */}
            <label htmlFor={name} className='font-semibold text-black text-md capitalize'>
                {label}
            </label>
            <div className={clsx(
                'w-full px-5 flex flex-row justify-start items-start bg-transparent border border-[#CFDBEF] gap-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-purple rounded-full py-3.5 relative',
            )}>
                {/* icons */}
                <label htmlFor={name} className='w-6 h-6 flex flex-col justify-center items-center'>
                    <img src={`/assets/images/icons/${icon}`} loading='lazy' />
                </label>

                {/* input */}
                <input
                    {...register}
                    ref={inputRef}
                    type='text'
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    readOnly
                    className='appearance-none outline-none bg-transparent w-full font-semibold text-black placeholder:font-normal placeholder:text-[#6B6C7F] h-full relative cursor-pointer capitalize'
                    onClick={() => setOptionActive(!optionActive)}
                />

                {/* option */}
                {
                    optionActive && (
                        <div ref={optionRef} className='w-[90%] absolute top-[107%] flex flex-col justify-center items-center bg-white border'>
                            <div className='w-[100%] flex flex-col justify-start items-start'>
                                {
                                    choose.map((item, i) => (
                                        <Option key={i} option={item} handleClick={() => {
                                            handleOnChange(item),
                                                setValue('type', item ?? "", { shouldValidate: true })
                                        }} />
                                    ))

                                }
                            </div>
                        </div>
                    )
                }

                {/* arrow down */}
                <button ref={buttonRef} type='button' className='w-6.5 h-full flex flex-col justify-center items-center' onClick={() => setOptionActive(!optionActive)}>
                    <img src="/assets/images/icons/arrow-down.svg" alt="arrow" className="w-full" />
                </button>
            </div>
            {/* error message */}
            <div className='min-h-7'>
                <ErrorMessage error={error?.message} />
            </div>
        </div>
    )
}

type PropsOption = {
    option: string;
    handleClick: (option: string | 'video' | 'text') => void;
}
// option 
const Option: FC<PropsOption> = ({ option, handleClick }) => {
    return (
        <button type='button' className='w-full py-1.5 px-4 hover:bg-primary-purple hover:text-white transition-all duration-100 text-left' onClick={() => handleClick(option)}>
            {option}
        </button>
    )
}



export default AddContentCourse
