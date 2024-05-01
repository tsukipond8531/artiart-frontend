'use client'

import History from 'components/Account/history'
import Button from 'components/Common/Button'
import Container from 'components/Common/Container'
import { HeadingH3 } from 'components/Common/Heading'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import ProtectedRoute from 'hooks/AuthHook'
import { CiUser } from 'react-icons/ci'
import { useRouter } from "next/navigation"; 


function Account() {
  const router = useRouter();

  const tokenRemoveHandler = ()=>{
    localStorage.removeItem("2guysToken")
    router.push("/login");

  }
  return (
    <>
    <Navbar/>
    <Container className='mt-10 md:mt-20'>
        <HeadingH3 title={"Account"}/>
        <button className={` flex items-center gap-2 p-2 underline  rounded-md`} onClick={tokenRemoveHandler}>
        <CiUser size={20} /> Log out
        </button>
        <History/>
    </Container> 
<Footer/>
    </>
  )
}

// export default Account;

export default ProtectedRoute(Account);