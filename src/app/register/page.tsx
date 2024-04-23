import Button from 'components/Common/Button'
import { HeadingH3 } from 'components/Common/Heading'
import Input from 'components/Common/Input'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import Link from 'next/link'
import React from 'react'

const register:React.FC = () => {
  return (
    <>
    <Navbar/>
        <div className='max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10'>
    <HeadingH3 className='text-center mb-10' title={"Create Account"}/>
    <form className=' space-y-4'>
    <Input type='text' name='firstName' placeholder='Enter First Name' label='First Name'/>
    <Input type='text' name='lastName' placeholder='Enter Last Name' label='Last Name'/>
    <Input type='email' name='email' placeholder='Email' label='Email'/>
    <Input type='password' name='password' placeholder='Enter Password' label='Password'/>
    <div className=' flex flex-col justify-center items-center space-y-3'>
        <Button className='bg-black text-white p-3 rounded-none w-full md:w-28' title={"Create"}/>
    </div>
    </form>

   </div>
   <Footer/>
    </>
  )
}

export default register