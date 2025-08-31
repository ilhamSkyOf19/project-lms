import { useEffect, useRef, useState, type ChangeEvent, type FC, type FormEvent } from 'react'
import HeaderContentDashboard from '../../../../components/HeaderContentDahsboard'
import ButtonBorder from '../../../../components/ButtonBorder'
import BoxInputData from '../../../../components/BoxInputData'
import BoxInputChoose from '../../../../components/BoxInputChoose'
import ButtonPurple from '../../../../components/ButtonPurple'
import ButtonTrash from '../../../../components/ButtonTrash'
import clsx from 'clsx'
import type { CategoryResponse } from '../../../../model/category-model'
import { CategoryService } from '../../../../service/category.service'

const NewCourse: FC = () => {
    // state input
    const [inputImg, setInputImg] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [thumbnailEmpty, setThumbnailEmpty] = useState<boolean>(false);

    // category
    const [categoryOption, setCategoryOption] = useState<CategoryResponse[]>([]);


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
    const handleCategory = (option: string) => {
        setCategory(option.toLowerCase());
    }



    // handle submit
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const file = formData.get("thumbnail") as File;

        if (file.name === '') {
            setThumbnailEmpty(true);
            return;
        }

        console.log(file);
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
                <form onSubmit={handleSubmit} className='w-full flex flex-col justify-start items-start gap-8'>
                    {/* input course name */}
                    <BoxInputData type='text' name='courseName' icon='note-favorite-black.svg' label='course name' placeholder='Write better name for your course' />

                    {/* add thummbnail */}
                    <InputThumbnail inputImg={inputImg} setInputImg={setInputImg} thumbnailEmpty={thumbnailEmpty} setThumbnailEmpty={setThumbnailEmpty} />

                    {/* tagline */}
                    <BoxInputData type='text' name='tagline' icon='bill-black.svg' label='course tagline' placeholder='Write tagline for better copy' />

                    {/* category */}
                    <BoxInputChoose name='category' icon='bill-black.svg' label='select category' value={category} chooses={categoryOption} handleOnChange={handleCategory} placeholder='Choose one category' />

                    {/* text area */}
                    <BoxInputData type='textarea' name='description' icon='note-black.png' label='description' placeholder='Write better description for your course' />

                    {/* button */}
                    <div className='w-full flex flex-row justify-between items-center gap-4'>
                        <ButtonBorder label='Save as Draft' width={'full'} type='submit' />
                        <ButtonPurple label='create now' width={'full'} type='submit' />
                    </div>
                </form>

            </div>
        </div>
    )
}


type PropsInputThumbnail = {
    setThumbnailEmpty: (thumbnailEmpty: boolean) => void
    thumbnailEmpty: boolean
    setInputImg: (inputImg: string) => void;
    inputImg: string
}

const InputThumbnail: FC<PropsInputThumbnail> = ({ setThumbnailEmpty, thumbnailEmpty, setInputImg, inputImg }) => {
    const [preview, setPreview] = useState<string>('');
    // ref input thumbnail
    const refInputThumb = useRef<HTMLInputElement>(null);

    // handle input thumb
    const handleChangeInputImg = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            const name = file.name;
            setInputImg(name);
            setPreview(objectUrl);
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
            setInputImg('');
            setPreview('');
        }
    }

    // handle avatar empty
    useEffect(() => {
        if (preview !== '') {
            setThumbnailEmpty(false);
        }
    }, [preview])


    return (
        <div className='w-full flex flex-col justify-start items-start gap-3'>
            {/* label */}
            <label className='font-semibold text-md text-black'>Add a Thumbnail</label>
            {/* input hidden */}
            <input
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
                thumbnailEmpty ? 'border-red-500 ring-1 ring-red-500' : 'border-[#CFDBEF]'
            )}>
                {
                    inputImg === '' && preview === '' ? (
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
            {
                thumbnailEmpty && (
                    <p className='text-red-500 text-sm'>Thumbnail is required</p>
                )
            }

        </div>
    )
}



export default NewCourse
