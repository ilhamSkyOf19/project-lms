import clsx from 'clsx';
import { type FC } from 'react'


type Props = {
    active: boolean;
    number: number;
    handleButton: () => void
}
const ButtonPagination: FC<Props> = ({ number, handleButton, active }) => {
    return (
        <button type='button' className={clsx(
            'w-9 h-9 text-sm font-semibold flex flex-row justify-center items-center rounded-full hover:bg-primary-purple hover:border-primary-purple hover:text-white transition-all duration-300 group',
            active ? 'bg-primary-purple text-white' : 'bg-white border'
        )} onClick={handleButton}>
            {number}
        </button>
    )
}

export default ButtonPagination
