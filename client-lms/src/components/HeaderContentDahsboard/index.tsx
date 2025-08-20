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
            <TitleContentDahsboard header={header} desc={desc} />
            {/* button */}
            <div className='w-full flex flex-row justify-end items-center gap-4'>
                {children}
            </div>
        </div>
    )
}

export default HeaderContentDashboard
