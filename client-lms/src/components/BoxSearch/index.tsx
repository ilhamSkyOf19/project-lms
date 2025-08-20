import { type FC } from 'react'

const BoxSearch: FC = () => {
    return (
        <form className='w-full py-3 px-6 flex flex-row justify-between items-center gap-2 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-primary-purple transition-all duration-300'>
            {/* input */}
            <input
                type='text'
                name='search'
                id='search'
                className='outline-none w-full font-semibold placeholder:font-normal text-black'
                placeholder='Search course, student, other file...'
            />
            {/* label */}
            <label htmlFor='search' className='w-6 h-6 flex flex-col justify-center items-center'>
                <img src='/assets/images/icons/search-normal.svg' alt='icon' loading='lazy' />
            </label>
        </form>
    )
}

export default BoxSearch
