import Container from 'components/Common/Container'
import { HeadingH3, HeadingH6 } from 'components/Common/Heading'
import { Para14 } from 'components/Common/Paragraph'
import React from 'react'


const AboutUs = () => {
  return (
    <>
        <Container className='mt-10 md:mt-20'>
        <div className='max-w-screen-md mx-auto space-y-5 '>
            <HeadingH3 className='' title={"About Us"}/>
            <HeadingH6 title={"WHAT IS ARTIART?"}/>
            <Para14 title={"Originated in Taiwan, ARTIART, is a research and design company which integrates the two to create and manufacture High Quality & High Precision products. With comfortable philosophy as its theme, ARTIART believes in designing & creating elegant high quality lifestyle products."}/>
        </div>
        </Container> 
    </>
  )
}

export default AboutUs