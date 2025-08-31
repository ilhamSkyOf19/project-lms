import { useEffect, useRef, useState, type ChangeEvent, type FC } from 'react'
import clsx from 'clsx'

import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'
import ButtonTrash from '../ButtonTrash';
import ErrorMessage from '../ErrorMessage';


// thumbnail

type PropsInputThumbnail = {
    register: UseFormRegisterReturn;
    error?: FieldError;
    setValue: any;
    resetField: any
    thumbnail: string | undefined;
}

const BoxInputThumbnail: FC<PropsInputThumbnail> = ({ register, error, setValue, resetField, thumbnail }) => {
    // state preview
    const [preview, setPreview] = useState<string>('');
    // ref input thumbnail
    const refInputThumb = useRef<HTMLInputElement>(null);


    // handle preview
    useEffect(() => {
        if (thumbnail) {
            setPreview(thumbnail);
        }
    }, [thumbnail])


    // handle input thumb
    const handleChangeInputImg = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            thumbnail = undefined;
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

export default BoxInputThumbnail



