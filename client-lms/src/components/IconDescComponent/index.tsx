import { type FC } from 'react'

type Props = {
    icon: string;
    label: string
}
const IconDescComponent: FC<Props> = ({ icon, label }) => {
    return (
        <div className=' flex flex-row justify-start items-start gap-2'>
            {/* icon */}
            <img src={`/assets/images/icons/${icon}`} alt='crown' className='w-5 h-5' loading='lazy' />
            {/* category */}
            <p className='text-md text-slate-500 capitalize group-hover:text-primary-purple transition-all duration-300'>
                {label}
            </p>
        </div>
    )
}

export default IconDescComponent
