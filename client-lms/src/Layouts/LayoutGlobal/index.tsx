import { type FC, type ReactNode } from 'react'
import Navbar from '../../components/Navbar'


type Props = {
    children: ReactNode;
}

const LayoutGlobal: FC<Props> = ({ children }) => {
    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-center items-center p-2 bg-white'>
            <div className='w-full min-h-[97vh] bg-primary-black flex flex-col justify-start items-center rounded-2xl overflow-hidden relative'>
                {/* round element */}
                <div className='absolute w-[35rem] h-[35rem] rounded-full bg-gradient-to-l to-white from-primary-purple z-0 -bottom-[23rem] blur-3xl opacity-60' />

                <div className='flex-1 w-full bg-transparent flex flex-col justify-start items-center backdrop-blur-3xl relative pb-2 pt-28'>
                    {/* navbar */}
                    <Navbar />

                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayoutGlobal
