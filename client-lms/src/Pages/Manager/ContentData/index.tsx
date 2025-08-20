import { type FC } from 'react'
import CardData from '../../../components/CardData'
import type { DataChart } from '../../../types'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { getPersentase } from '../../../helper/formatPersentase'

type Props = {
    data: DataChart[]
}
const ContentData: FC<Props> = ({ data }) => {
    return (
        <div className='bg-[#F8FAFB] w-full h-[26rem] flex flex-row justify-between items-center p-6 rounded-3xl overflow-x-hidden'>
            {/* container card data */}
            <div className='w-[90rem] h-full flex flex-row justify-start items-center flex-wrap gap-7'>
                {/* card total students*/}
                <CardData icon='profile-2user-purple' number={189498} desc='total students' />
                {/* card total course*/}
                <CardData icon='note-favorite-purple' number={7221} desc='total courses' />
                {/* card video content*/}
                <CardData icon='video-play-purple' number={893891} desc='video content' />
                {/* card text content*/}
                <CardData icon='note-purple' number={12812} desc='text content' />
            </div>


            {/* container donuts chart */}
            <DonutChart data={data} />
        </div>
    )
}

type PropsDonutChart = {
    data: DataChart[];
}


const DonutChart: FC<PropsDonutChart> = ({ data }) => {
    // total raport 
    const totalRaport = data.reduce((acc, curr) => acc + curr.value, 0)
    // color chart
    const COLORS: string[] = ['#bd00ff', '#e066ff']
    return (
        <div className='w-full h-full rounded-3xl bg-primary-white shadow-md hover:shadow-primary-purple-opacity transition-all duration-300 flex flex-col justify-start items-start gap-7 pt-8'>
            {/* chart */}
            <div className='w-full h-[15rem]'>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="data"
                            cx={"50%"}
                            cy={"50%"}
                            innerRadius={70}
                            outerRadius={120}
                            paddingAngle={0.5}
                        >
                            {/* label */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-black font-bold "
                            >
                                <tspan x="50%" dy="-0.5em" fontSize="23">Our</tspan>
                                <tspan x="50%" dy="1.2em" fontSize="23">Rapport</tspan>
                            </text>

                            {/* stastic */}
                            {data.map((_, i) => (
                                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(val: number, name: string) => [
                                val.toLocaleString("en-US"),
                                name,
                            ]}
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* desc */}
            <div className='w-full flex flex-col justify-start items-start gap-2.5 px-4'>
                {/* complate */}
                <PersentaseComponent label='complated' persentase={data[0].value} total={totalRaport} color='#BD00FF' />
                {/* not complate */}
                <PersentaseComponent label='not complated' persentase={data[1].value} total={totalRaport} color='#E066FF' />
            </div>
        </div>
    )
}

type PropsPersentaseComponent = {
    label: string;
    persentase: number
    total: number;
    color: '#BD00FF' | '#E066FF';
}

// persentase 
const PersentaseComponent: FC<PropsPersentaseComponent> = ({ label, persentase, total, color }) => {
    return (
        <div className='w-full flex flex-row justify-start items-center gap-3'>
            {/* circle */}
            <div className={`w-5 h-5 rounded-full`} style={{ backgroundColor: color }} />
            {/* text */}
            <p className='text-sm text-black font-semibold'>
                {label}
                <span className='ml-1 '>
                    {getPersentase(persentase, total)}
                </span>
            </p>
        </div>
    )
}

export default ContentData
