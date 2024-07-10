'use client'
import axios from 'axios';
import { error } from 'console';
import Link from 'next/link';
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
   <div className="flex items-center justify-center h-screen">
  <div className="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
    <div className="flex flex-col items-center p-4 space-y-2 bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Thank You !</h1>
      <p>Payment successful! Thank you for your purchase.
</p>
      <Link href={'/'} className="flex items-center  cursor-pointeri tems-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span className="text-sm font-medium">
          Continue to Shopping
        </span>
      </Link>
    </div>
  </div>
</div>

        </div>
    );
};

export default PostPayhnalder;
