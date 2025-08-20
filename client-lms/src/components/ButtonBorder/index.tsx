import { type FC } from 'react'

type Props = {
    label: string;
}

const ButtonBorder: FC<Props> = ({ label }) => {
    return (
        <button type='button' className='px-6 py-3.5 rounded-full text-black border font-semibold capitalize flex flex-row justify-center items-center text-sm hover:scale-105 transition-all duration-300'>
            {
                label
            }
        </button>
    )
}

export default ButtonBorder
