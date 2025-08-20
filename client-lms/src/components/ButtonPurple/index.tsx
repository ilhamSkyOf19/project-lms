import { type FC } from 'react'
import { Link } from 'react-router'

type Props = {
    link: string;
    label: string;
}

const ButtonPurple: FC<Props> = ({ link, label }) => {
    return (
        <Link to={link} className='px-6 py-3.5 rounded-full text-white font-semibold bg-primary-purple capitalize flex flex-row justify-center items-center text-sm'>
            {
                label
            }
        </Link>
    )
}

export default ButtonPurple
