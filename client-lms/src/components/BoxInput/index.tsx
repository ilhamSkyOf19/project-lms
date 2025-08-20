import { type FC } from 'react'


type Props = {
    type: 'email' | 'password' | 'name';

}
const BoxInput: FC<Props> = ({ type }) => {
    return (
        <div className='w-full px-5 py-3.5 rounded-full flex flex-row justify-start items-center bg-primary-black border border-[#24283E] gap-2 shadow-inset-light focus-within:border-primary-purple focus-within:shadow-[-10px_-6px_10px_0_#bd00ff_inset] transition-all duration-300'>
            {/* icons */}
            <label htmlFor={type} className='w-6 h-6 flex flex-col justify-center items-center'>
                <img src={`/assets/images/icons/${type === 'email' ? 'sms-white' : type === 'password' ? 'key-white' : 'user-octagon-white'}.svg`} loading='lazy' />
            </label>

            {/* input */}
            <input
                type={type === 'name' ? 'text' : type}
                name={type}
                id={type}
                className='appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-[#6B6C7F]'
                placeholder={
                    type === 'email' ? 'Write your email address' : type === 'password' ? 'Type your secure password' : 'Write your complate name'}
                required
            />
        </div>
    )
}

export default BoxInput
