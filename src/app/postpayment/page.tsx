'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';



// types.ts
export interface PaymentQueryParams {
    id: string | null;
    amount_cents: string| null ;
    success: string | null;
    // integration_id: string | null,
    currency: string | null,
    is_refund: string | null,
    order: string | null,
    pending: string | null,
    is_3d_secure: string | null,
    created_at: string | null

}


const PostPayhnalder = () => {
    const searchParams = useSearchParams()

    const id = searchParams.get('id')
    const amount_cents = searchParams.get('amount_cents')
    const success = searchParams.get('success')
    // const integration_id = searchParams.get('integration_id')
    const created_at = searchParams.get('created_at')
    const currency = searchParams.get('currency')
    const is_refund = searchParams.get('is_refund')
    const order = searchParams.get('order')
    const pending = searchParams.get('pending')
    const is_3d_secure = searchParams.get('is_3d_secure')


    let paymentObject = {
        id,
        success,
        amount_cents,
        // integration_id,
        currency,
        is_refund,
        order,
        pending,
        is_3d_secure,
        created_at
    }
    const [payementDetails, setpayementDetails] = useState<PaymentQueryParams>(paymentObject)
const dbFunctionHandler =()=>{
    
}


    return (
        <div>
            <h1>Payment Handler</h1>
            <pre>{JSON.stringify(payementDetails)}</pre>
        </div>
    );
};

export default PostPayhnalder;
