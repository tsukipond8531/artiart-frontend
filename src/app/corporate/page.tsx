"use client"


import Container from 'components/Common/Container'
import { HeadingH2 } from 'components/Common/Heading'
import { Para14 } from 'components/Common/Paragraph'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import Link from "next/link";
import React from 'react'

const Corporate = () => {
  return (
    <>
    <Navbar/>
         <Container className='mt-10 md:mt-20'>
        <div className='max-w-screen-md mx-auto space-y-5 '>
            <HeadingH2 className='' title={"Customized Corporate Orders"}/>
            <Para14 title={"Grow your brand awareness with custom bottles with your company brand!"}/>
            <Para14 title={<>Contact us on <Link className='underline' href={"mailto:b2b@artiart.ae"}>b2b@artiart.ae.</Link> </>}/>
       </div>
        </Container> 
<Footer/>
    </>
  )
}

export default Corporate