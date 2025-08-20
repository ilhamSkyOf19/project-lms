import { type FC } from 'react'
import SideBar from '../../components/SideBar';
import { Outlet } from 'react-router';
import HeaderDashboard from '../../components/HeaderDashboard';


const LayoutDashboard: FC = () => {
    return (
        <div className='w-full min-h-[100vh] flex flex-row justify-start items-start overflow-x-hidden'>
            {/* sidebar */}
            <div className='w-[25rem] h-[100vh] p-2.5'>
                <SideBar />
            </div>
            {/* children */}
            <div className='w-full h-[100vh] px-7 overflow-y-scroll py-9'>
                {/* header */}
                <HeaderDashboard />
                {/* content */}
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutDashboard
