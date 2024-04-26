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
        <div className='w-full md:w-2/6 '>
        <HeadingH3 className='font-bold' title={"Contact"}/>
        <HeadingH6 className='font-bold' title={"Call Customer Services :"}/>
        <Para16 className='font-bold' title={"04-252-2025"}/>
        <div className='mt-5'>
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4082.7742465747338!2d-79.38287617561478!3d43.64905556573276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2a57d767f%3A0x935ab2eb9fd5fb31!2sFirst%20Canadian%20Place!5e0!3m2!1svi!2s!4v1591603052999!5m2!1svi!2s"
              width="100%"
              height="100%"
              aria-hidden="false"
            ></iframe>
        </div>
        </div>
        <div className='w-full md:w-4/6 mt-10 md:mt-0'>
        <div className='grid grid-cols-2 md:grid-cols-2 justify-items-center md:justify-items-start'>
        <div>
            <HeadingH6 title={"Address :"}/>
            <Para14 title={"23 22nd St - Al Quoz Industrial Area 4 - Dubai"}/>
        </div>
        <div>
            <HeadingH6 title={"Email :"}/>
            <Para14 title={"cs@avenue39.com"}/>
        </div>
        </div>
        <Form layout="vertical" className='mt-10'>
        <Row gutter={[10,0]}>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item >
              <Input type='text' name='Name' placeholder='Your Name' label='Your Name' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item  >
              <Input type='email' name='Email' placeholder='Your Email' label='Your Email' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item >
              <Input type='number' name='Number' placeholder='Phone Number' label='Phone Number' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item >
            <TextArea rows={4} placeholder="Message" maxLength={6} />
            </Form.Item>
          </Col>
        </Row>
         <Button className='bg-black text-white py-4 rounded-none' title={"Send Message"}/>
      </Form>
        </div>
    </div> 

    </Container>
     <Footer/>
    </>
  )
}

export default Contact