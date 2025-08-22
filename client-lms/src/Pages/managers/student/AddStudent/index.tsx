import { useEffect, useRef, useState, type ChangeEvent, type FC, type FormEvent } from 'react'
import HeaderContentDashboard from '../../../../components/HeaderContentDahsboard'
import ButtonBorder from '../../../../components/ButtonBorder'
import BoxInputData from '../../../../components/BoxInputData'
import ButtonTrash from '../../../../components/ButtonTrash'
import ButtonPurple from '../../../../components/ButtonPurple'
import clsx from 'clsx'

const AddStudent: FC = () => {

    // state input avatar empty
    const [emptyAvatar, setEmptyAvatar] = useState<boolean>(false);



    // handle submit 
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const formData = new FormData(event.currentTarget);

        const file = formData.get("avatar") as File;

        if (file.name === '') {
            setEmptyAvatar(true);
            return;
        }
    };


    return (
        <div className='w-full flex flex-col justify-start items-start gap-8'>
            {/* header */}
            <HeaderContentDashboard header='add student' desc='Create new future for company'>
                {/* import form BWA */}
                <ButtonBorder label='import form BWA' />
            </HeaderContentDashboard>


            {/* form */}

            <div className='bg-[#F8FAFB] w-[60%] flex flex-col justify-start items-center p-8 rounded-3xl overflow-x-hidden'>
                {/* form add */}
                <form onSubmit={handleSubmit} className='w-full flex flex-col justify-start items-start'>
                    {/* add a avatar */}
                    <InputFileAvatar
                        emptyAvatar={emptyAvatar}
                        setEmptyAvatar={setEmptyAvatar}
                    />
                    <div className='w-full flex flex-col justify-start items-start gap-8'>
                        {/* full name */}
                        <BoxInputData
                            name='fullName'
                            type='text'
                            icon='note-favorite-black.svg'
                            label='full name'
                            placeholder='Write your name' />

                        {/* email address */}
                        <BoxInputData
                            name='emailAddress'
                            type='email'
                            icon='sms-black.svg'
                            label='email address'
                            placeholder='Write your email address'

                        />

                        {/* password */}
                        <BoxInputData
                            name='password'
                            type='password'
                            icon='lock-black.svg'
                            label='password'
                            placeholder='Type password'
                        />

                        {/* button submit */}
                        <div className='w-full flex flex-row justify-between items-center gap-4'>
                            {/* save a draft */}
                            <ButtonBorder type='submit' label='save a draft' name='save' width='full' />
                            {/* add now */}
                            <ButtonPurple type='submit' label='add now' name='add' width='full' />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}


// input file avatar

type PropsInputFileAvatar = {
    setEmptyAvatar: (emptyAvatar: boolean) => void
    emptyAvatar: boolean;

}


const InputFileAvatar: FC<PropsInputFileAvatar> = ({ emptyAvatar, setEmptyAvatar }) => {
    // state avatar & preview
    const [preview, setPreview] = useState<string>('');
    // ref input avatar
    const avatarRef = useRef<HTMLInputElement>(null);
    // handle click input avatar
    const handleClickInputAvatar = () => [
        avatarRef.current?.click()
    ]

    // handle onchange input avatar
    const handleOnChangeInputAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    }

    // handle reset 
    const handleResetInputAvatar = () => {
        if (avatarRef.current) {
            avatarRef.current.value = '';
            setPreview('');
        }
    }

    // handle error empty avatar
    useEffect(() => {
        if (preview !== '') {
            setEmptyAvatar(false);
        };
    }, [preview])
    return (
        <div className='w-full flex flex-col justify-start items-start gap-2.5'>
            {/* label */}
            <label className='font-semibold text-md' htmlFor='avatar'>Add a Avatar</label>
            {/* input hidden */}
            <input
                ref={avatarRef}
                type="file"
                name='avatar'
                id='avatar'
                accept='image/*'
                onChange={handleOnChangeInputAvatar}
                hidden={true}
            />

            {/* button click input avatar */}
            <div className='w-full h-full flex flex-col justify-start items-start gap-1'>
                <div className='w-full h-[5rem] flex flex-row justify-start items-center gap-4'>
                    <div className={clsx(
                        'w-[5rem] h-full flex flex-col justify-center items-center border  rounded-2xl overflow-hidden transition-all duration-200',
                        emptyAvatar ? 'border-red-500 ring-1 ring-red-500' : 'border-[#CFDBEF]'
                    )}>
                        {
                            preview !== '' ? (
                                <img src={preview} alt="preview" className='w-full h-full object-cover' loading='lazy' />
                            ) : (
                                <button type='button' className='w-full h-full flex flex-col justify-center items-center' onClick={handleClickInputAvatar}>
                                    <img src="/assets/images/icons/gallery-add-black.svg" alt="icon" className='w-6 h-6' loading='lazy' />
                                </button>
                            )
                        }
                    </div>
                    {
                        (preview !== '') && (
                            <div className='w-12 h-full flex flex-col justify-center items-center'>
                                <ButtonTrash handleOnClick={handleResetInputAvatar} />
                            </div>
                        )
                    }
                </div>
                <div className='w-full h-7'>
                    {
                        emptyAvatar && <p className='text-red-500 text-sm'>avatar is required</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddStudent
