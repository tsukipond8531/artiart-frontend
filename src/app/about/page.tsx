import Container from 'components/Common/Container'
import { HeadingH2, HeadingH3, HeadingH6 } from 'components/Common/Heading'
import { Para14 } from 'components/Common/Paragraph'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import React from 'react'


const AboutUs = () => {
  return (
    <>
    <Navbar/>
        <Container className='mt-10 md:mt-20'>
        <div className='max-w-screen-md mx-auto space-y-5 '>
            <HeadingH2 className='' title={"About Us"}/>
            <HeadingH6 title={"WHAT IS ARTIART?"}/>
            <Para14 title={"Originating in Taiwan, ARTIART is a research and design company that integrates the two to create and manufacture high-quality & High Precision products. With comfortable philosophy as its theme, ARTIART believes in designing & creating elegant quality lifestyle products."}/>
            <Para14 title={"Our Products encompass all aspects of elegance & quality that define Comfort & Utility."}/>
            <Para14 title={"Artiart’s Suction grip technology is one such revolution. Now you don’t have to worry about your drink spilling on your workstation or your phone or Laptop. Artiart’s Suction grip technology drinkware is specially designed to carry drinks with superior temperature retention and without worry & hassle of spillage occurrence. The suction grip holds the drinkware firmly on the flat surface, when pushed or hit accidentally, but lifts straight very easily."}/>
            <Para14 title={"Start is constantly engaged in researching and designing products of utility that can ease your life and yet are beautiful."}/>
            <Para14 title={"Artiart’s presence & acceptance of products in 65 countries is proof of the quality and functionality it delivers. Artiart’s designs have been recognized & awarded with one of the world’s most celebrated design awards- IF DESIGN AWARD 2020, which itself is a symbol of design excellence around the world."}/>
            <HeadingH6 title={"WHAT WE OFFER?"}/>
            <Para14 className='underline' title={"Custom Made Corporate Gifts:"}/>
            <Para14 title={"ARTIART is an expression of Premium Quality & Precision that any organization can use as a medium to convey their conviction in their ideology of valuing the efforts of their employees."}/>
            <Para14 title={"We also provide custom-made Corporate Gifts through which employees can sustain organizations' values & beliefs forever."}/>
            <Para14 className='underline' title={"Joint Development for New Products:"}/>
            <Para14 title={"ARTIART offers its vast resource of designs and utilities in the Home, Kitchen, Office & Travel which can ease one’s life, for OEM, ODM & private label services. ARTIART provides services to all companies (offline or online) that have a vast distribution network and strong customer base. We facilitate complete design and branding solutions, be it for your merchandise store, your coffee chain, your retail stores, or your supermarkets"}/>
            <Para14 className='underline' title={"Joint Marketing for ARTIART Products:"}/>
            <Para14 title={"For a company which is having strong customer traffic in the internet channel, Artiart can collaborate and tailor-made joint promotion and marketing programs for our products in their channel by adding a flair of Quality in Comfort."}/>
        </div>
        </Container> 
<Footer/>
    </>
  )
}

export default AboutUs