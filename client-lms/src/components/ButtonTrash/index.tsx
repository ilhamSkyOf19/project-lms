import { type FC } from 'react'

type Props = {
    handleOnClick: () => void
}
const ButtonTrash: FC<Props> = ({ handleOnClick }) => {
    return (
        <button type='button' className='flex flex-row justify-center items-center' onClick={handleOnClick}>
            <img src="/assets/images/icons/delete.svg" alt="trash" className='w-12' />
        </button>
    )
}

export default ButtonTrash
