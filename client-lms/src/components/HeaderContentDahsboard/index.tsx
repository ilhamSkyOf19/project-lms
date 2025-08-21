import { type FC, type ReactNode } from 'react'
import TitleContentDahsboard from '../TitleContentDahsboard'

type Props = {
    header: string;
    desc: string;
    children: ReactNode;
}
const HeaderContentDashboard: FC<Props> = ({ header, desc, children }) => {
    return (
        <div className='w-full flex flex-row justify-between items-center'>
            {/* text */}
            <div className='flex-2 flex flex-col justify-start items-start'>
                <TitleContentDahsboard header={header} desc={desc} />
            </div>
            {/* button */}
            <div className='flex-1 flex flex-row justify-end items-center gap-4'>
                {children}
            </div>
        </div>
    )
}

export default HeaderContentDashboard
