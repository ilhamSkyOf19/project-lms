import clsx from 'clsx';
import { useEffect, useRef, useState, type FC } from 'react'


type Props = {
    name: string;
    icon: string;
    label: string;
    value: string;
    handleOnChange: (option: string) => void
    chooses: string[]
    placeholder: string
}
const BoxInputChoose: FC<Props> = ({ icon, name, label, value, chooses, handleOnChange, placeholder }) => {
    // state option
    const [optionActive, setOptionActive] = useState<boolean>(false);
    // ref option & ref input & ref button arrow down
    const inputRef = useRef<HTMLInputElement>(null);
    const optionRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // handle outside click option
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (optionRef.current && !optionRef.current.contains(target) && inputRef.current && !inputRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
                setOptionActive(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [optionRef])

    useEffect(() => {
        console.log(value)
    }, [value])
    return (
        <div className='w-full flex flex-col justify-start items-start gap-2.5 '>
            {/* label */}
            <label htmlFor={name} className='font-semibold text-black text-md capitalize'>
                {label}
            </label>
            <div className={clsx(
                'w-full px-5 flex flex-row justify-start items-start bg-transparent border border-[#CFDBEF] gap-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-purple rounded-full py-3.5 relative',
            )}>
                {/* icons */}
                <label htmlFor={name} className='w-6 h-6 flex flex-col justify-center items-center'>
                    <img src={`/assets/images/icons/${icon}`} loading='lazy' />
                </label>

                {/* input */}
                <input
                    ref={inputRef}
                    type='text'
                    name={name}
                    id={name}
                    value={value === '' ? placeholder : value}
                    readOnly
                    className='appearance-none outline-none bg-transparent w-full font-semibold text-black placeholder:font-normal placeholder:text-[#6B6C7F] h-full relative cursor-pointer capitalize'
                    onClick={() => setOptionActive(!optionActive)}
                />

                {/* option */}
                {
                    optionActive && (
                        <div ref={optionRef} className='w-[90%] absolute top-[107%] flex flex-col justify-center items-center bg-white border'>
                            <div className='w-[100%] flex flex-col justify-start items-start'>
                                {
                                    chooses.map((item, i) => (
                                        <Option key={i} option={item} handleClick={handleOnChange} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                {/* arrow down */}
                <button ref={buttonRef} type='button' className='w-6.5 h-full flex flex-col justify-center items-center' onClick={() => setOptionActive(!optionActive)}>
                    <img src="/assets/images/icons/arrow-down.svg" alt="arrow" className="w-full" />
                </button>
            </div>
        </div>
    )
}

type PropsOption = {
    option: string;
    handleClick: (option: string) => void;
}
// option 
const Option: FC<PropsOption> = ({ option, handleClick }) => {
    return (
        <button type='button' className='w-full py-1.5 px-4 hover:bg-primary-purple hover:text-white transition-all duration-100 text-left' onClick={() => handleClick(option)}>
            {option}
        </button>
    )
}

export default BoxInputChoose
