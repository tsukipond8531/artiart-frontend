import React from 'react'

import { FaLongArrowAltRight } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa6'
import { SiAmericanexpress } from 'react-icons/si'
import ae from "../../../../public/assets/images/ae.svg"
import apple from "../../../../public/assets/images/apple.svg"
import master from "../../../../public/assets/images/master.svg"
import visa from "../../../../public/assets/images/visa.svg"
import Image from 'next/image'
import Container from 'components/Common/Container'
import { Para14, Para18 } from 'components/Common/Paragraph'

const Footer = () => {
  return (
    <>
    
    <div className='mt-10 md:mt-32 border  '>
        <Container className='text-center mt-10'>
        <Para18 className='poppins-thin'  title={"Subscribe to our emails"}/>    
            <form className="max-w-md mx-auto mt-5 mb-20">   
            <div className="relative">
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 " placeholder="Search......." required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "><FaArrowRight  className='text-black' size={25} /></button>
            </div>
            </form>
        </Container>
    </div>
    <Container>
    <div className='mt-10 mb-10'>
        <div className='text-center max-w-screen-md mx-auto flex justify-center gap-2'>
        <Image src={ae} width={50} height={50} alt='Ae'/>
        <Image src={apple} width={50} height={50} alt='Ae'/>
        <Image src={master} width={50} height={50} alt='Ae'/>
        <Image src={visa} width={50} height={50} alt='Ae'/>
        </div>

        <Para14 title={"© 2024, artiartuae"}/>
    </div>
    </Container>
 
    </>
  )
}

export default Footer