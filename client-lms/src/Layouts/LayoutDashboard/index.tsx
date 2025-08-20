import { type FC, type ReactNode } from 'react'

type Props = {
    children: ReactNode;
}
const LayoutDashboard: FC<Props> = ({ children }) => {
    return (
        <div>
            {/* children */}
            {children}
        </div>
    )
}

export default LayoutDashboard
