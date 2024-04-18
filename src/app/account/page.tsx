import History from 'components/Account/history'
import Button from 'components/Common/Button'
import Container from 'components/Common/Container'
import { HeadingH3 } from 'components/Common/Heading'
import Link from 'next/link'
import React from 'react'
import { CiUser } from 'react-icons/ci'

const Account = () => {
  return (
    <>
    <Container className='mt-10 md:mt-20'>
        <HeadingH3 title={"Account"}/>
        <button className={` flex items-center gap-2 p-2 underline  rounded-md`}>
        <CiUser size={20} /> Log out
        </button>
        <History/>
    </Container> 
    </>
  )
}

export default Account