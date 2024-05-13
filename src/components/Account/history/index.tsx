"use client"

import { HeadingH3 } from 'components/Common/Heading'
import { Para14 } from 'components/Common/Paragraph'
import Link from 'next/link'
import React from 'react'

const History = () => {
  return (
    <div className='mt-10 flex justify-between'>
        <div className='space-y-4'>
            <HeadingH3 className='font-light' title={"Order history"}/>
            <Para14 className='font-normal' title={"You haven't placed any orders yet."}/>
        </div>
        <div className='space-y-4'>
        <HeadingH3 className='font-light' title={"Account details"}/>
        <Para14 className='font-normal' title={"Muhammad Ahmad"}/>
        <Para14 className='font-normal' title={"United Arab Emirates"}/>
        <div>
            <Link className='underline' href={"address"}>View addresses</Link>
        </div>

        </div>
    </div>
  )
}

export default History