import { type FC } from 'react'


type Props = {
    label: string;
    disabled?: boolean;
}

const ButtonSign: FC<Props> = ({ disabled, label }) => {
    return (
        <div className='w-full flex-1 flex flex-row justify-center items-center'>
            <button disabled={disabled} type='submit' className='px-3 py-4 bg-primary-purple rounded-full text-sm font-bold text-white capitalize w-full hover:shadow-[0_0_15px_0_#bd00ff] shadow-primary-purple transition-all duration-300'>
                {label}
            </button>
        </div>
    )
}

export default ButtonSign
