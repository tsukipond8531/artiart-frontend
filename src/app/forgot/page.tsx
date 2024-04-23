import Button from 'components/Common/Button'
import { HeadingH3 } from 'components/Common/Heading'
import Input from 'components/Common/Input'
import { Para14 } from 'components/Common/Paragraph'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import Link from 'next/link'
import React from 'react'

const Forgot = () => {
  return (
    <>
    <Navbar/>
         <div className='max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10'>
    <HeadingH3 className='text-center ' title={"Reset your password"}/>
    <Para14 className='text-center mb-10' title={"We will send you an email to reset your password"}/>
    <form className=' space-y-4'>
    <Input type='email' name='email' placeholder='Email' label='Email'/>
    <div className=' flex flex-col justify-center items-center space-y-3'>
        <Button className='bg-black text-white w-full md:w-28 p-3 rounded-none' title={"Submit"}/>
        <Link className='underline text-[14px]' href={"/login"}>Cancel</Link>
    </div>
    </form>

   </div> 
<Footer/>
    </>
  )
}

export default Forgot