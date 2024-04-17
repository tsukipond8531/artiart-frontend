import Container from 'components/Common/Container'
import { HeadingH2, HeadingH3, HeadingH6 } from 'components/Common/Heading'
import { Para14 } from 'components/Common/Paragraph'
import React from 'react'


const AboutUs = () => {
  return (
    <>
        <Container className='mt-10 md:mt-20'>
        <div className='max-w-screen-md mx-auto space-y-5 '>
            <HeadingH2 className='' title={"About Us"}/>
            <HeadingH6 title={"WHAT IS ARTIART?"}/>
            <Para14 title={"Originated in Taiwan, ARTIART, is a research and design company which integrates the two to create and manufacture High Quality & High Precision products. With comfortable philosophy as its theme, ARTIART believes in designing & creating elegant high quality lifestyle products."}/>
            <Para14 title={"Our Products encompass all aspects of elegance & quality that define Comfort & Utility."}/>
            <Para14 title={"Artiart’s Suction grip technology is one such revolution. Now you don’t have to worry about your drink spilling on your workstation or your phone or Laptop. Artiart’s Suction grip technology drink ware is specially designed to carry drinks with superior temperature retention and without worry & hassle of spillage occurrence. The suction grip holds the drink ware firmly on the flat surface, when pushed or hit accidently, but lifts up straight very easily."}/>
            <Para14 title={"rtiart is constantly engaged in researching and designing products of utility which can ease your life and yet are beautiful."}/>
            <Para14 title={"Artiart’s presence & acceptance of products in 65 countries is a proof of quality and functionality it delivers. Artiart’s designs have been recognised & awarded with one of the world’s most celebrated design award- IF DESIGN AWARD 2020, which itself is a symbol of design excellence around the world."}/>
            <HeadingH6 title={"WHAT WE OFFER?"}/>
            <Para14 className='underline' title={"Custom Made Corporate Gifts:"}/>
            <Para14 title={"ARTIART is an expression of Premium Quality & Precision that any organization can use as a medium to convey their conviction in their ideology of valuing efforts of their employees."}/>
            <Para14 title={"We also provide custom made Corporate Gifts through which employees can sustain organisations values & beliefs forever."}/>
            <Para14 className='underline' title={"Joint Development for New Products:"}/>
            <Para14 title={"ARTIART offers its vast resource of designs and utilities in Home, Kitchen, Office & Travel which can ease one’s life, for OEM, ODM & private label services. ARTIART provides services to all companies (offline or online) who have vast distribution network and strong customer base. We facilitate complete design and branding solution, be it for your merchandise store, your coffee chain, your retail stores or supermarkets"}/>
            <Para14 className='underline' title={"Joint Marketing for ARTIART Products:"}/>
            <Para14 title={"For the company which is having strong customer traffic in the internet channel, Artiart can collaborate and tailor-made joint promotion and marketing program for our products in their channel by adding a flair of Quality in Comfort."}/>
        </div>
        </Container> 
    </>
  )
}

export default AboutUs