import { type FC } from 'react'


type Props = {
    icon: 'profile-2user-purple' | 'crown-purple' | 'note-favorite-purple' | 'cup-purple';
    text: string;
}
const CardInfo: FC<Props> = ({ icon, text }) => {
    return (
        <div className='flex flex-col justify-between items-start bg-white rounded-2xl border border-[#CFDBEF] px-3.5 py-4.5'>
            {/* icon */}
            <img src={`/assets/images/icons/${icon}.svg`} alt="icon" className='w-8' loading='lazy' />
            {/* text */}
            <p className='font-semibold text-md'>{text}</p>
        </div>
    )
}

export default CardInfo
