import { type FC } from 'react'
import { Link } from 'react-router'

type Props = {
    link: string;
    label: string;
}

const ButtonLinkBorder: FC<Props> = ({ link, label }) => {
    return (
        <Link to={link} className='px-6 py-3.5 rounded-full text-black font-semibold  capitalize flex flex-row justify-center items-center text-sm hover:scale-105 transition-all duration-300 border'>
            {
                label
            }
        </Link>
    )
}

export default ButtonLinkBorder
