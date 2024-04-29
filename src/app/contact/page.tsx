"use client"
import { Col, Form, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Button from 'components/Common/Button'
import Container from 'components/Common/Container'
import { HeadingH3, HeadingH6 } from 'components/Common/Heading'
import Input from 'components/Common/Input'
import { Para14, Para16 } from 'components/Common/Paragraph'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import React from 'react'

const Contact = () => {
  return (
    <>
    <Navbar/>
    <Container className='mt-10 md:mt-20'>
    <div className='flex flex-wrap md:flex-nowrap gap-0 md:gap-5 p-2'>
        <div className='w-full md:w-1/2  '>
        <HeadingH3 className=' poppins-semibold' title={"Contact"}/>
      <div className='flex items-center gap-4 mt-5 '>
      <HeadingH6 className='poppins-semibold' title={"Call Customer Services :"}/>
        <Para16 className='font-bold poppins-thin' title={"04-252-2025"}/>
      </div>
      <div className=' lg:mb-10'>
        <div className='flex items-center gap-5 mt-2'>
            <HeadingH6 className='poppins-semibold' title={"Address :"}/>
            <Para14 className='poppins-thin' title={"23 22nd St - Al Quoz Industrial Area 4 - Dubai"}/>
        </div>
        <div className='flex items-center gap-5 mt-2'>
            <HeadingH6 className='poppins-semibold' title={"Email :"}/>
            <Para14 className='poppins-thin' title={"cs@avenue39.com"}/>
        </div>
        </div>
        <div className='mt-7'>
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4082.7742465747338!2d-79.38287617561478!3d43.64905556573276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2a57d767f%3A0x935ab2eb9fd5fb31!2sFirst%20Canadian%20Place!5e0!3m2!1svi!2s!4v1591603052999!5m2!1svi!2s"
              width="100%"
              height="100%"
              aria-hidden="false"
            ></iframe>
        </div>
        </div>
        <div className='border border-gray-300 lg:d-block d-none'></div>
        <div className='w-full md:w-1/2 mt-10 md:mt-0 '>
       
        <Form layout="vertical" className=''>
        <Row gutter={[10,0]}>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item className='poppins-semibold' label="Your Name" >
              <Input type='text' name='Name' placeholder='Your Name' label='Your Name' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item  className='poppins-semibold' label="Your Email">
              <Input type='email' name='Email' placeholder='Your Email' label='Your Email' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item className='poppins-semibold' label="Phone Number">
              <Input type='number' name='Number' placeholder='Phone Number' label='Phone Number' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item className='poppins-semibold' label="Message">
            <TextArea rows={4} placeholder="Message" maxLength={6} />
            </Form.Item>
          </Col>
        </Row>
         <Button className='bg-black text-white py-3 px-5 rounded-none' title={"Send Message"}/>
      </Form>
        </div>
    </div> 

    </Container>
     <Footer/>
    </>
  )
}

export default Contact