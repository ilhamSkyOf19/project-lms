import { useEffect, useState, type FC } from 'react'
import { formatCurrency } from '../../helper/formatCurrency';
import ListFeaturesCardPricing from '../ListFeaturesCardPricing';

type Props = {
    type: 'regular' | 'premium';
    country: string;
}

const CardPricing: FC<Props> = ({ type, country }) => {
    // state pricing active
    const [ragular, setRagular] = useState<boolean>(false);
    const [premium, setPremium] = useState<boolean>(false);


    // handle pricing active
    useEffect(() => {
        if (country === 'id_ID') {
            setRagular(false);
            setPremium(true);
        } else {
            setRagular(true);
            setPremium(true)
        }
    }, [country])

    // features
    const featuresRagular: string[] = ['Access gigantic features company', 'Students analytics and export']
    const featuresPremium: string[] = ['Access gigantic features company', 'Students analytics and export', 'Life support 24/7 maintenances', 'Export and analyze data real time', 'More big features coming soon']



    return (
        <div className='w-[26rem] py-8 px-7 bg-primary-black border border-[#24283E] rounded-2xl flex flex-col justify-start items-start'>
            {/* icon */}
            <div className='w-full mb-8'>
                <img src='/assets/images/icons/note-favorite-white.svg' alt='pricing icon' className='w-14 h-14' loading='lazy' />
            </div>

            {/* price */}
            <div className='w-full flex flex-col justify-start items-start gap-4 pb-10 relative line-gray'>
                <h1 className='text-white font-extrabold text-5xl'>

                    {
                        type === 'regular' ? formatCurrency(80000) : formatCurrency(280000)
                    }
                </h1>
                <p className='text-slate-100 opacity-60 text-sm'>
                    Billed every single month
                </p>
            </div>

            {/* features */}
            <div className='w-full flex flex-col justify-start items-center gap-4 py-7 relative line-gray'>
                {
                    type === 'regular' ? (
                        featuresRagular.map((item, i) => (
                            <ListFeaturesCardPricing key={i} text={item} />
                        ))
                    ) : (
                        featuresPremium.map((item, i) => (
                            <ListFeaturesCardPricing key={i} text={item} />
                        ))

                    )
                }
            </div>

            {/* button */}
            <div className='w-full flex flex-col justify-start items-center gap-4 pt-6'>
                {/* not active */}
                {
                    type === 'regular' && (
                        !ragular ? (
                            <div className='w-full mb-3'>
                                <p className='text-md text-red-500'>
                                    This plan is not available at this moment in your country, try again later.
                                </p>
                            </div>

                        ) : (
                            <>
                                <button type='button' className='w-full text-white py-4 bg-primary-purple rounded-full text-md font-semibold capitalize'>
                                    choose this plan
                                </button>

                            </>
                        )
                    )
                }

                {
                    type === 'premium' && (
                        !premium ? (
                            <div className='w-full'>
                                <p className='text-md text-red-500'>
                                    This plan is not available at this moment in your country, try again later.
                                </p>
                            </div>
                        ) : (
                            <>
                                <button type='button' className='w-full text-white py-4 bg-primary-purple rounded-full text-md font-semibold capitalize'>
                                    choose this plan
                                </button>
                            </>
                        )
                    )
                }
                <button type='button' className='w-full text-white py-4 rounded-full text-md font-semibold capitalize shadow-inset-light border border-[#24283E] hover:shadow-[-10px_-6px_10px_0_#bd00ff_inset] hover:bg-primary-purple transition-all duration-300'>
                    contact our sales
                </button>

            </div>
        </div>
    )
}

export default CardPricing
