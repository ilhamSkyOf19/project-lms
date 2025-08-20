import { type FC, type RefObject } from 'react'
import { Link } from 'react-router'
import type { Menu } from '../../types'
type Props = {
    modalRef: RefObject<HTMLDivElement>
}
const ModalProfile: FC<Props> = ({ modalRef }) => {

    // const menu profile 
    const menuProfile: Menu[] = [
        {
            link: '/',
            label: 'my account'
        },
        {
            link: '/',
            label: 'subscriptions'
        },
        {
            link: '/',
            label: 'settings'
        }
    ]
    return (
        <div ref={modalRef} className='bg-white border border-slate-300 w-[12.5rem] h-[12rem] rounded-3xl absolute right-0 -bottom-[13.5rem] z-40 flex flex-col justify-between items-center py-6'>
            {/* link */}
            {
                menuProfile.map((item, index) => (
                    <Link key={index} to={item.link} className='font-semibold text-md text-black hover:text-primary-purple transition-all duration-300 px-6 w-full capitalize'>
                        {item.label}
                    </Link>
                ))
            }
            {/* button */}
            <button type='button' className='font-semibold text-md text-black hover:text-primary-purple transition-all duration-300 px-6 w-full capitalize text-left'>
                logout
            </button>
        </div>
    )
}

export default ModalProfile
