import { type FC } from 'react'

type Props = {
    label: string;
}

const ButtonPurple: FC<Props> = ({ label }) => {
    return (
        <button type='button' className='px-6 py-3.5 rounded-full text-white font-semibold bg-primary-purple capitalize flex flex-row justify-center items-center text-sm border border-primary-purple hover:scale-105 transition-all duration-300'>
            {
                label
            }
        </button>
    )
}

export default ButtonPurple
