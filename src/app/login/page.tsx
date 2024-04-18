import Button from 'components/Common/Button'
import Container from 'components/Common/Container'
import { HeadingH3, HeadingH4 } from 'components/Common/Heading'
import Input from 'components/Common/Input'
import Link from 'next/link'
import React from 'react'

const Login:React.FC = () => {
  return (
   <div className='max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10'>
    <HeadingH3 className='text-center mb-10' title={"Login"}/>
    <form className=' space-y-4'>
    <Input type='email' name='email' placeholder='Email' label='Email'/>
    <Input type='password' name='password' placeholder='Enter Password' label='Password'/>

    <Link className='underline text-[14px]' href={"/forgot"}>Forgot your password?</Link>
    
    <div className=' flex flex-col justify-center items-center space-y-3'>
        <Button className='bg-black text-white p-3 w-full md:w-28 rounded-none' title={"Sign In"}/>
        <Link className='underline text-[14px]' href={"/register"}>Create account</Link>
    </div>
    </form>

   </div>
  )
}

export default Login