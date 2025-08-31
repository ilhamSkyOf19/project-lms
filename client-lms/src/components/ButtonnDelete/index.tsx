import { type FC } from 'react'

type Props = {
    label: string;
    handleButton?: () => void
}

const ButtonDelete: FC<Props> = ({ label, handleButton }) => {
    return (
        <button type='button' className='px-6 py-3.5 rounded-full text-white font-semibold bg-red-500 capitalize flex flex-row justify-center items-center text-sm border border-red-500 hover:scale-105 transition-all duration-300' onClick={handleButton}>
            {
                label
            }
        </button>
    )
}

export default ButtonDelete
