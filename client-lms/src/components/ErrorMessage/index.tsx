import clsx from 'clsx'
import { type FC } from 'react'


type Props = {
    error?: string;
}

const ErrorMessage: FC<Props> = ({ error }) => {
    return (
        <p className={clsx(
            'text-sm text-red-500 font-light  transition-all duration-200',
            error ? 'opacity-100' : 'opacity-0'
        )}>{error}</p>
    )
}

export default ErrorMessage
