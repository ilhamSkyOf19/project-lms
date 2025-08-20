import { type FC } from 'react'
import BoxSearch from '../BoxSearch'

const HeaderDashboard: FC = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center mb-8'>
            {/* search */}
            <div className='w-[28rem] flex flex-row justify-start items-center'>
                <BoxSearch />
            </div>

            {/* profile */}
            <div className='flex flex-row justify-end items-center gap-2.5'>
                {/* name and role */}
                <div className='flex flex-col justify-center items-end'>
                    {/* name */}
                    <h4 className='text-lg font-semibold capitalize'>Ilham Rohmatulloh</h4>
                    {/* role */}
                    <p className='text-sm text-slate-400 capitalize'>
                        Manager
                    </p>
                </div>
                {/* avatar */}
                <div className='w-13 h-13 rounded-full overflow-hidden'>
                    <img src='/assets/images/photos/photo-1.png' className='w-full h-full object-cover' alt='avatar' />
                </div>
            </div>
        </div>
    )
}

export default HeaderDashboard
