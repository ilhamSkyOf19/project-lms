import { type FC } from 'react'
import SideBar from '../../components/SideBar';
import { Outlet, useMatch } from 'react-router';
import HeaderDashboard from '../../components/HeaderDashboard';
import SideBarPreview from '../../components/SideBarPreview';
import clsx from 'clsx';

type Props = {
    role: 'manager' | 'student'
}
const LayoutDashboard: FC<Props> = ({ role }) => {

    // use match 
    const preview = useMatch('/manager/course/manage-course-materi/:id/preview/:idContent') || useMatch('/student/course/:id/preview/:idContent');


    return (
        <div className='w-full min-h-[100vh] flex flex-row justify-start items-start overflow-x-hidden'>
            {/* sidebar */}
            <div className={clsx(
                'h-[100vh] p-2.5',
                preview ? 'w-[30rem]' : 'w-[25rem]'
            )}>
                {
                    preview ? (
                        <SideBarPreview role={role} />
                    ) : (
                        <SideBar role={role} />
                    )
                }
            </div>
            {/* children */}
            <div className='w-full h-[100vh] px-7 overflow-y-scroll py-8'>
                {/* header */}
                <HeaderDashboard />
                {/* content */}
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutDashboard
