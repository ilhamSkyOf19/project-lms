import { type FC } from 'react'
import { Link } from 'react-router'

const NotFound: FC = () => {
    return (
        <div className='w-full h-[100vh] overflow-hidden bg-primary-black flex flex-col justify-center items-center gap-1'>
            {/* img */}
            <img src='/assets/images/logos/404.svg' alt='not found' className='w-[20rem]' loading='lazy' />
            {/* text */}
            <h1 className='font-semibold text-md text-white -mt-8 capitalize'>we are sorry, but the page you requested was <span className='text-primary-purple font-bold'>not found</span></h1>

            {/* button */}
            <Link to={'/manager'} className='text-primary-purple font-semibold capitalize hover:underline'>Back Home</Link>
        </div>
    )
}

export default NotFound
