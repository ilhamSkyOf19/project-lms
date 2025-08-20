import clsx from 'clsx';
import type { FC } from 'react'
import { Link } from 'react-router'

type Props = {
    link: string;
    icon: string;
    label: string;
    active: boolean
}
const ButtonMenuSideBar: FC<Props> = ({ link, icon, label, active }) => {
    return (
        <Link to={link} className={clsx(
            'w-full py-4 px-5 flex flex-row justify-start items-center gap-3.5 bg-primary-black border border-[#24283E] rounded-full  hover:border-primary-purple hover:bg-primary-purple hover:shadow-[-10px_-6px_10px_0_#bd00ff_inset] transition-all duration-300',
            active ? 'bg-primary-purple ' : 'shadow-inset-light'
        )}>
            {/* icons */}
            <img src={`/assets/images/icons/${icon}.svg`} alt='icon' className='w-6 h-6' loading='lazy' />
            {/* label */}
            <h3 className='font-semibold text-white text-md capitalize'>
                {label}
            </h3>

        </Link>
    )
}

export default ButtonMenuSideBar
