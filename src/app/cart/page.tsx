import Container from 'components/Common/Container'
import { HeadingH4 } from 'components/Common/Heading'
import CartTable from 'components/Table/CartTable'
import Link from 'next/link'
import React from 'react'

const Cart:React.FC = () => {
  return (
    <>
    <Container className='mt-10 md:mt-32'>
        <div className='flex justify-between items-center'>
            <HeadingH4 title={"Your cart"}/>
            <Link className='underline' href={"/products"}>Continue shopping</Link>
        </div>
        <CartTable/>
    </Container>
    </>
  )
}

export default Cart