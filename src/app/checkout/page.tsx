"use client"
import { Col, Form, Row } from 'antd'
import Container from 'components/Common/Container'
import { HeadingH2, HeadingH3, HeadingH4, HeadingH5, HeadingH6 } from 'components/Common/Heading'
import Input from 'components/Common/Input'
import SelectInput from 'components/Common/Selectinput'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'


const Checkout = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('subtotal')
  const parseSubtotal = search ? JSON.parse(search) : null;
  console.log('parseSubtotal, ', parseSubtotal)
const [shipment, setShipment] = useState<number | undefined | null >(parseSubtotal ? Number(parseSubtotal) : undefined)


  return (
    <>
    <Navbar/>
    <Container className='mt-10 md:mt-20'>
    <HeadingH6 className='border-b-2 font-bold lg:pb-3' title={"Billing details"}/>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5'>
            <div>
  <Form layout="vertical">
        <Row gutter={[10,0]}>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"First Name"}>
              <Input type='text' name='name' placeholder='First Name' label='First Name' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:12}} lg={{order:1,span:12}} md={{order:1,span:12}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Last Name"} >
              <Input type='text' name='name' placeholder='Last Name' label='Last Name' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Company Name (Optional)"}>
              <Input type='text' name='name' placeholder='Company Name (Optional)' label='Company Name (Optional)' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Country/Region "} name={"Country/Region"}>
            <SelectInput placeholder={"Country/Region"} />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Street address"}>
              <Input type='text' name='Name' placeholder='Street address' label='Street address' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Town / City "}>
              <Input type='text' name='Name' placeholder='Town / City' label='Town / City' />
            </Form.Item>
          </Col>
          {/* <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item >
            <Input type='text' name='Name' placeholder='Enter Name' label='Name' />
            </Form.Item>
          </Col> */}
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"State"} name={"State"}>
            <SelectInput placeholder={"State "} />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Postcode"}>
              <Input type='text' name='Name' placeholder='Postcode' label='Postcode' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Phone"}>
              <Input type='text' name='Name' placeholder='Phone' label='Phone' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Email address"}>
              <Input type='text' name='Name' placeholder='Email address' label='Email address' />
            </Form.Item>
          </Col>
          <Col xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
          <HeadingH6 className='border-b-2 font-bold lg:pb-2' title={"Additional information"}/>
          </Col>
          <Col className='mt-5' xl={{order:1,span:24}} lg={{order:1,span:24}} md={{order:1,span:24}} sm={{order:1,span:24}} xs={{order:1,span:24}}>
            <Form.Item label={"Order notes (optional)"}>
              <Input  type='text' name='Name' placeholder='Notes about your order, e.g. special notes for delivery.' label='Notes about your order, e.g. special notes for delivery.' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
            </div>
      
        <div className='p-2'>
        <div className="flex border flex-col sticky top-24 p-4">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
    <HeadingH6 className='lg:mt-3 font-bold' title={"Your order"} />
      <div className="overflow-hidden ">
        <table className="min-w-full divide-y divide-gray-200 lg:mt-8 ">
          <thead className=''>
            <tr className='border-b-gray-200 border px-3'>
              <th scope="col" className="px-6 py-3 text-start text-[17px] text-gray-800 poppins-thin ">Product</th>
              <th scope="col" className="px-6 py-3 text-start text-[17px] text-gray-800 poppins-thin ">Subtotal</th>
            </tr>
          </thead>
          <tbody >
            <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border  ">
              <td className="px-6 py-4 whitespace-nowrap text-[14px] poppins-thin text-gray-800">ARTIST STEEL SUCTION BOTTLE - Light Grey 
× 1</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{parseSubtotal ? parseSubtotal : ''}</td>            
            </tr>

            <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border">
              <td className="px-6 py-4 whitespace-nowrap text-[14px] poppins-thin text-gray-800">Shippment</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{shipment && shipment > 199 ? "Free" :  30}</td>           
            </tr>

            <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border">
              <td className="px-6 py-4 whitespace-nowrap text-[14px] poppins-thin text-gray-800">Total</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{shipment && (shipment > 199 ? parseSubtotal : 30 + Number(parseSubtotal))}</td>
            </tr>
          </tbody>
        </table>
        <div className='w-full m-auto text-center '>
                <button className='bg-blue-500 text-white w-full m-auto p-2 my-5'>Place Order</button>
            </div>
      </div>
    </div>
  </div>
</div>


        </div>
        </div>
    </Container>
          <Footer/>
    </>
  )
}

export default Checkout