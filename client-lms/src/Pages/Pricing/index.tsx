import { memo, type FC } from 'react'
import LayoutGlobal from '../../Layouts/LayoutGlobal'
import CardPricing from '../../components/CardPricing'
import type { SignUpRequestType } from '../../model/auth-model'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../../service/auth.service'

type Props = {
    data: SignUpRequestType;
}

const Pricing: FC<Props> = ({ data }) => {

    // handle mutation
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (data: SignUpRequestType) => AuthService.signUp({ ...data, photo: 'default.jpg', role: 'manager' }),
    })

    // handle submit 
    const handleSubmit = async () => {
        try {

            if (!data) {
                return
            }


            // response 
            const response = await mutateAsync(data);
            window.location.replace(response.midtrans_payment_url.redirect_url);

        } catch (error) {
            console.log(error);
        }
    }


    console.log(data);
    return (
        <LayoutGlobal>
            {/* title */}
            <div className='w-full  flex flex-col justify-start items-center gap-5 pt-12'>
                <h1 className='text-white font-bold capitalize text-[2.8rem] text-center'>
                    Best Pricing For Everyone <br />Who Wants to Grow Business
                </h1>
                <p className='text-lg text-white'>
                    We delivery robust features to anyone unconditionally.
                </p>
            </div>
            {/* cards */}
            <div className='w-full flex flex-row justify-start items-start gap-8 py-12'>
                {/* card 1 */}
                <div className='w-full flex flex-row justify-end items-center'>
                    <CardPricing type='regular' country='id_ID' handleSubmit={handleSubmit} isPending={isPending} />
                </div>
                <div className='w-full flex flex-row justify-start items-center'>
                    <CardPricing type='premium' country='id_ID' handleSubmit={handleSubmit} isPending={isPending} />
                </div>
            </div>
        </LayoutGlobal>
    )
}

export default memo(Pricing)
