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
        <Button className='underline' icon={<CiUser size={20} />}  title={"Log out"}/>
        <History/>
    </Container> 
    </>
  )
}

export default Account