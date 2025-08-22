import { useRef, useState, type ChangeEvent, type FC } from 'react'
import HeaderContentDashboard from '../../components/HeaderContentDahsboard'
import ButtonBorder from '../../components/ButtonBorder'
import BoxInputData from '../../components/BoxInputData'
import BoxInputChoose from '../../components/BoxInputChoose'
import ButtonPurple from '../../components/ButtonPurple'

const NewCourse: FC = () => {
    // state input
    const [inputImg, setInputImg] = useState<string>('');
    const [category, setCategory] = useState<string>('');


    // handle category 
    const handleCategory = (option: string) => {
        setCategory(option.toLowerCase());
    }




    // memoization
    const InputThumbnailMemo = () => <InputThumbnail inputImg={inputImg} setInputImg={setInputImg} />

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
                <form className='w-full flex flex-col justify-start items-start gap-8'>
                    {/* input course name */}
                    <BoxInputData type='text' name='courseName' icon='note-favorite-black.svg' label='course name' placeholder='Write better name for your course' />

                    {/* add thummbnail */}
                    {InputThumbnailMemo()}

                    {/* tagline */}
                    <BoxInputData type='text' name='tagline' icon='bill-black.svg' label='course tagline' placeholder='Write tagline for better copy' />

                    {/* category */}
                    <BoxInputChoose name='category' icon='bill-black.svg' label='select category' value={category} chooses={['Programming', 'Design', 'Marketing']} handleOnChange={handleCategory} placeholder='Choose one category' />

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
    setInputImg: (inputImg: string) => void;
    inputImg: string
}

const InputThumbnail: FC<PropsInputThumbnail> = ({ setInputImg, inputImg }) => {
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
                required />
            <div className='w-full h-[14rem] flex flex-row justify-center items-center gap-3 relative border border-[#CFDBEF] rounded-3xl overflow-hidden'>
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
                            <button type='button' className='absolute right-3 bottom-3' onClick={handleResetInputImg}>
                                <img src="/assets/images/icons/delete.svg" alt="trash" className='w-12' />
                            </button>
                        </div>
                    )
                }
            </div>

        </div>
    )
}



export default NewCourse
