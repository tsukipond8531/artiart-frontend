'use client'
import axios from 'axios';
import { error } from 'console';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';



// types.ts
export interface PaymentQueryParams {
    id: string | null;
    amount_cents: string | null;
    success: string | null;
    integration_id: string | null,
    currency: string | null,
    is_refund: string | null,
    order_id: string | null,
    pending: string | null,
    is_3d_secure: string | null,
    created_at: string | null

}




const PostPayhnalder = () => {
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    const amount_cents = searchParams.get('amount_cents')
    const success = searchParams.get('success')
    const integration_id = searchParams.get('integration_id')
    const created_at = searchParams.get('created_at')
    const currency = searchParams.get('currency')
    const is_refund = searchParams.get('is_refund')
    const order_id = searchParams.get('order')
    const pending = searchParams.get('pending')
    const is_3d_secure = searchParams.get('is_3d_secure')


    let paymentObject = {
        id,
        success,
        amount_cents,
        integration_id,
        currency,
        is_refund,
        order_id,
        pending,
        is_3d_secure,
        created_at
    }
    const [payementDetails, setpayementDetails] = useState<PaymentQueryParams>(paymentObject)
    const dbFunctionHandler = async () => {
        try {
            if (!id || !success || !amount_cents || !integration_id || !currency || !order_id || !pending || !is_3d_secure || !created_at) {
                throw new Error('Missing required fields in request body')
            }
            const response = await axios.post(
                `${[process.env.NEXT_PUBLIC_BASE_URL]}/api/payment/postPayhnalder`, payementDetails,);
            console.log(response, "response")
        } catch (error) {
            console.log(error, "err")
        }

    }


    useEffect(() => {
        dbFunctionHandler()
    }, [])


    console.log(payementDetails, "payementDetails")
    return (
        <div>
            <h1>Payment Handler</h1>
            <pre>{JSON.stringify(payementDetails)}</pre>
        </div>
    );
};

export default PostPayhnalder;
