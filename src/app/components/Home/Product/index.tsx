import React from 'react'
import Container from '../../common/Container'
import { HeadingH4 } from '../../common/Heading'
import tra1 from "../../../../../public/assets/images/tra1.jpg";
import tra2 from "../../../../../public/assets/images/tra2.jpg";
import Image from 'next/image';

const Product = () => {
  return (
    <Container className='mt-10 md:mt-32'>
    <HeadingH4 title={"Features"}/>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10'>
    <div className="w-full relative">
      <div className="hover-switch relative w-full">
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0">
          <Image className='Imagecard' src={tra2} alt='tra' width="200" height="200" />
        </div>
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image className='Imagecard' src={tra1} alt='tra' width="200" height="200" />
        </div>
      </div>
    </div>
    </div>
</Container>
  )
}

export default Product