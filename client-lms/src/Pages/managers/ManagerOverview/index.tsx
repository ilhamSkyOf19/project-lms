import { type FC } from 'react'
import ButtonPurple from '../../../components/ButtonPurple'
import ButtonLinkBorder from '../../../components/ButtonLinkBorder'
import ContentData from './ContentData'
import ContentLatest from './ContentLatest'
import HeaderContentDashboard from '../../../components/HeaderContentDahsboard'

const ManagerOverview: FC = () => {

    // data chart 
    const dataChart = [
        {
            data: "Complated",
            value: 2000
        },
        {
            data: "Not Complated",
            value: 650
        }
    ]


    return (
        <div className='w-full min-h-[100vh] flex flex-col justify-start items-start gap-8'>
            {/* header content */}
            <HeaderContentDashboard header='overview' desc='grow your company quickly'>
                {/* button customize */}
                <ButtonLinkBorder link='#' label='customize' />
                {/* button export */}
                <ButtonPurple label='export data' />
            </HeaderContentDashboard>

            {/* content data */}
            <ContentData data={dataChart} />

            {/* content latest */}
            <ContentLatest />
        </div>
    )
}





export default ManagerOverview
