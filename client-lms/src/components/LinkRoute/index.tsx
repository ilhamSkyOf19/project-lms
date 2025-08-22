import clsx from 'clsx';
import { type FC } from 'react'
import { Link } from 'react-router';

type Link = {
    link: string;
    label: string;
}

type Props = {
    link: Link[];
}
const LinkRoute: FC<Props> = ({ link }) => {
    return (
        <div className='flex flex-row justify-start items-start gap-4'>
            {
                link.map((item, i) => (
                    <div key={i} className='flex flex-row justify-start items-center gap-3.5'>
                        {(i + 1) > 1 && <span>/</span>}
                        <LinkRouteComponent link={item.link} label={item.label} />
                    </div>
                ))
            }
        </div>
    )
}

type PropsLinkRoute = {
    link: string;
    label: string;
}
// link route
const LinkRouteComponent: FC<PropsLinkRoute> = ({ link, label }) => {
    return (
        <Link to={`${link}`} className={clsx(
            'text-md text-black capitalize hover:text-primary-purple hover:underline',
            label === 'detail' && 'font-semibold'
        )}>{label}</Link>
    )
}

export default LinkRoute
