import { type FC } from 'react'
import ButtonMenuSideBar from '../ButtonMenuSideBar'
import type { MenuSidebar } from '../../types'
import { useLocation } from 'react-router'

const SideBar: FC = () => {

    // menu general
    const menuGeneral: MenuSidebar[] = [
        {
            link: '/manager',
            icon: '3dcube-white',
            label: 'overview'
        },
        {
            link: '/manager/course',
            icon: 'note-favorite-white',
            label: 'course'
        },
        {
            link: '/manager/categories',
            icon: 'crown-white',
            label: 'categories'
        },
        {
            link: '/manager/students',
            icon: 'profile-2user-white',
            label: 'students'
        },
    ]

    // menu others
    const menuOthers: MenuSidebar[] = [
        {
            link: '/manager/subscription',
            icon: 'security-card-white',
            label: 'subscription'
        },
        {
            link: '/manager/rewards',
            icon: 'cup-white',
            label: 'rewards'
        },
        {
            link: '/manager/settings',
            icon: 'setting-2-white',
            label: 'settings'
        }
    ]
    return (
        <nav className='w-full h-full flex flex-col justify-start items-start rounded-3xl bg-primary-black relative overflow-hidden'>
            {/* circle glow */}
            <div className='absolute w-[35rem] h-[35rem] rounded-full bg-gradient-to-l to-white from-primary-purple z-0 -bottom-[25rem] blur-3xl opacity-60' />

            {/* content */}
            <div className='flex-1 w-full flex flex-col justify-start items-center bg-transparent backdrop-blur-2xl py-8 px-8 gap-9 overflow-y-scroll hide-scrollbar'>
                {/* icons */}
                <div className='w-full flex flex-row justify-start items-center'>
                    <h1 className='font-extrabold text-white text-2xl'>
                        IlhamLMS
                    </h1>
                </div>
                {/* menu general */}
                <ContainerMenu menu={menuGeneral} label={'general'} />
                {/* menu general */}
                <ContainerMenu menu={menuOthers} label={'others'} />
            </div>
        </nav>
    )
}


type PropsContainerMenu = {
    label: string;
    menu: MenuSidebar[];
}
// contianer menu 
const ContainerMenu: FC<PropsContainerMenu> = ({ label, menu }) => {

    // cek location path
    const location = useLocation();
    return (
        <div className='w-full flex flex-col justify-start items-start gap-4'>
            {/* title menu */}
            <h3 className='font-semibold text-sm text-white uppercase'>
                {label}
            </h3>
            {/* button */}
            <div className='w-full flex flex-col justify-start items-start gap-3.5'>
                {
                    menu.map((item, i) => (
                        <ButtonMenuSideBar key={i} link={item.link} icon={item.icon} label={item.label} active={i === 0 ? location.pathname === item.link : location.pathname.startsWith(item.link)} />
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar
