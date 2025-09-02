import { type FC } from 'react'
import SideBar from '../../components/SideBar';
import { Outlet, useLoaderData, useMatch } from 'react-router';
import HeaderDashboard from '../../components/HeaderDashboard';
import SideBarPreview from '../../components/SideBarPreview';
import clsx from 'clsx';
import type { UserModel } from '../../model/auth-model';

type Props = {
    role: 'manager' | 'student'
}
const LayoutDashboard: FC<Props> = ({ role }) => {

    // get user
    const user = useLoaderData() as UserModel;

    // use match 
    const previewMatch = useMatch('/manager/course/manage-course-materi/:id/preview/:idContent');
    const studentPreviewMatch = useMatch('/student/course/:id/preview/:idContent');

    const preview = previewMatch || studentPreviewMatch; // ini aman




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
                <HeaderDashboard user={user} />
                {/* content */}
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutDashboard
