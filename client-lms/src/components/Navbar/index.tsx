import { useEffect, type FC } from 'react'
import { Link } from 'react-router'
import type { Menu } from '../../types'
import { useLocation } from 'react-router'
import clsx from 'clsx'
import ButtonPurple from '../ButtonPurple'


const Navbar: FC = () => {

    // route 
    const location = useLocation();


    // link menu
    const LinkMenu: Menu[] = [
        {
            link: '/',
            label: 'Home'
        },
        {
            link: '/pricing',
            label: 'Pricing'
        },
        {
            link: '/features',
            label: 'Features'
        },
        {
            link: '/testimonials',
            label: 'Testimonials'
        }
    ]

    useEffect(() => {
        console.log(location.pathname)
    }, [location.pathname])


    return (
        <nav className='w-full p-8 flex flex-row justify-between items-center fixed top-0 left-0 z-50'>
            {/* logo */}
            <div className='flex-1 flex fle-col justify-start items-start'>
                <h2 className='font-bold text-white text-2xl'>
                    IlhamLMS
                </h2>
            </div>
            {/* menu */}
            <div className='flex-3 flex flex-row justify-start items-start gap-12'>
                {
                    LinkMenu.map((item, i) => (
                        <Link key={i} to={`${item.link}`} className={clsx(
                            'font-semibold  hover:text-primary-purple transition-all duration-300',
                            location.pathname === item.link ? 'text-primary-purple' : 'text-white'
                        )}>
                            {item.label}
                        </Link>

                    ))
                }
            </div>

            {/* button */}
            <div className='flex-2 flex flex-row justify-end items-center gap-4'>
                {/* my dashboard */}
                <Link to={'/'} className='px-5.5 py-3.5  rounded-full text-white font-semibold border border-[#24283E] shadow-inset-light hover:bg-primary-purple transition-all duration-300 hover:shadow-[-10px_-6px_10px_0_#bd00ff_inset] hover:border-primary-black capitalize text-sm'>
                    my dashboard
                </Link>

                {/* sign up */}
                <ButtonPurple link={location.pathname === '/manager/sign-up' ? '/manager/sign-in' : '/manager/sign-up'} label={location.pathname === '/manager/sign-up' ? 'sign in' : 'sign up'} />
            </div>
        </nav>
    )
}

export default Navbar
