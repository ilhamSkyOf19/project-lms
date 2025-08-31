import { useEffect, useRef, useState, type FC, type RefObject } from 'react'
import BoxSearch from '../BoxSearch'
import ModalProfile from '../ModalProfile';
import type { UserModel } from '../../model/auth-model';


type Props = {
    user: UserModel;
}
const HeaderDashboard: FC<Props> = ({ user: { name, role } }) => {
    // state modal
    const [modal, setModal] = useState<boolean>(false);

    // ref modal
    const modalRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLButtonElement>(null);
    // handle modal
    const handleModal = () => {
        setModal(prev => !prev);
    }


    // handle click outside modal
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (modalRef.current && !modalRef.current.contains(target) && profileRef.current && !profileRef.current.contains(target)) {
                setModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, [modalRef, profileRef])

    return (

        <div className='w-full flex flex-row justify-between items-center mb-8 relative'>
            {/* search */}
            <div className='w-[28rem] flex flex-row justify-start items-center'>
                <BoxSearch />
            </div>

            {/* profile */}
            <div className='flex flex-row justify-end items-center gap-2.5'>
                {/* name and role */}
                <div className='flex flex-col justify-center items-end'>
                    {/* name */}
                    <h4 className='text-lg font-semibold capitalize'>{name}</h4>
                    {/* role */}
                    <p className='text-sm text-slate-400 capitalize'>
                        {role}
                    </p>
                </div>
                {/* avatar */}
                <button ref={profileRef as RefObject<HTMLButtonElement>} type='button' className='w-13 h-13 rounded-full overflow-hidden'>
                    <img src='/assets/images/photos/photo-1.png' className='w-full h-full object-cover' alt='avatar' loading='lazy' onClick={handleModal} />
                </button>
            </div>

            {/* modal */}
            {
                modal && <ModalProfile modalRef={modalRef as RefObject<HTMLDivElement>} />
            }

        </div>
    )
}

export default HeaderDashboard
