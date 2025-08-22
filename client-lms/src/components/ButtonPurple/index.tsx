import clsx from 'clsx';
import { type FC } from 'react'

type Props = {
    label: string;
    width?: string
    type?: 'button' | 'submit'
    name?: string
}

const ButtonPurple: FC<Props> = ({ name, width, label, type }) => {
    return (
        <button name={name} type={type ? type : 'button'} className={clsx(
            'py-3.5 rounded-full text-white font-semibold bg-primary-purple capitalize flex flex-row justify-center items-center text-sm border border-primary-purple hover:scale-105 transition-all duration-300',
            width ? `w-${width}` : 'px-6'
        )}>
            {
                label
            }
        </button>
    )
}

export default ButtonPurple
