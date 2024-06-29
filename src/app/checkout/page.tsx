"use client";
import { Col, Form, Row } from 'antd';
import Container from 'components/Common/Container';
import { HeadingH6 } from 'components/Common/Heading';
import Input from 'components/Common/Input';
import SelectInput from 'components/Common/Selectinput';
import Footer from 'components/layout/Footer';
import Navbar from 'components/layout/Header/Navbar';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const Checkout = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('subtotal');
  const parseSubtotal = search ? JSON.parse(search) : null;
  const [shipment, setShipment] = useState<number | undefined | null>(parseSubtotal ? Number(parseSubtotal) : undefined);
  const [billingData, setBillingData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    building: '',
    floor: '',
    apartment: '',
    state:'',
    city: '',
    country: '',
    email: '',
    address:'',
    phone_number: ''
  });

  const handlePayment = async () => {
    try {
      let totalPayment=parseSubtotal>100?parseSubtotal:parseSubtotal+15;
      // Step 1: Authenticate and get the token
      const authResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/authenticate`);
      const token = authResponse.data.token;
      
      // Step 2: Create the order
      const orderResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/order`, { token, amount:totalPayment });
      const orderId = orderResponse.data.orderId;

      // Step 3: Generate the payment key
      const paymentKeyResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/payment_key`, { token, orderId, amount: totalPayment, billingData });
      const paymentKey = paymentKeyResponse.data.paymentKey;

      // Step 4: Redirect to Paymob's payment iframe
      // window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
      window.location.href = `https://uae.paymob.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
 
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const handleSelectChange = (name:string, value:string) => {
    console.log(`Field: ${name}, Value: ${value}`);
    setBillingData({ ...billingData, [name]: value });
  };
  console.log(billingData ,"billingData")
  return (
    <>
      <Navbar />
      <Container className='mt-10 md:mt-20'>
        <HeadingH6 className='border-b-2 font-bold lg:pb-3' title={"Billing details"} />
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5'>
          <div>
            <Form layout="vertical">
              <Row gutter={[10, 0]}>
                <Col span={12}>
                  <Form.Item label={"First Name"}>
                    <Input type='text' name='first_name' placeholder='First Name' value={billingData.first_name} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Last Name"}>
                    <Input type='text' name='last_name' placeholder='Last Name' value={billingData.last_name} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={"Email address"}>
                    <Input type='email' name='email' placeholder='Email address' value={billingData.email} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Phone"}>
                    <Input type='tel' pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" name='phone_number' placeholder='Phone (Optional)' value={billingData.phone_number} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Address"}>
                    <Input type='text' name='address' placeholder='Building, street, city (optional)' value={billingData.address} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                  <Form.Item label={"Street"}>
                    <Input type='text' name='street' placeholder='Street address' value={billingData.street} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Building"}>
                    <Input type='text' name='building' placeholder='building' value={billingData.building} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Floor"}>
                    <Input type='text' name='floor' placeholder='floor' value={billingData.floor} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"Apartment"}>
                    <Input type='text' name='apartment' placeholder='Town' value={billingData.apartment} onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={"City"}>
                    <Input type='text' name='city' placeholder='Town' value={billingData.city} onChange={handleInputChange} />
                  </Form.Item>
                </Col> */}
                <Col span={12}>
                <Form.Item label={"State"}>
                    <SelectInput
                      name='state'
                      placeholder={"State"}
                      value={billingData.state}
                      onChange={handleSelectChange}
                      selectoption={[
                        { title: "Dubai" },
                        { title: "Abu Dhabi" },
                        { title: "Sharjah" },
                        { title: "Ajman" },
                        { title: "Ras Al Khaima" },
                        { title: "Umm Al Quwain" },
                        { title: "Fujairah" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label={"Country/Region"}>
                    <SelectInput
                      name='country'
                      placeholder={"Country/Region"}
                      value={billingData.country}
                      onChange={handleSelectChange}
                      selectoption={[
                        { title: "United Arab Emirates" },
                      ]}
                    />
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
                      {/* <thead className=''>
                        <tr className='border-b-gray-200 border px-3'>
                          <th scope="col" className="px-6 py-3 text-start text-[17px] text-gray-800 poppins-thin "></th>
                          <th scope="col" className="px-6 py-3 text-start text-[17px] text-gray-800 poppins-thin ">Subtotal</th>
                        </tr>
                      </thead> */}
                      <tbody >
                        <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border  ">
                          <td className="px-6 py-4  text-[14px] poppins-thin text-gray-800">Products Prices</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{parseSubtotal ? parseSubtotal : ''}</td>            
                        </tr>

                        <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border">
                          <td className="px-6 py-4 whitespace-nowrap text-[14px] poppins-thin text-gray-800">Shippment Fee</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{parseSubtotal>100?"Free":15}</td>           
                        </tr>

                        <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border">
                          <td className="px-6 py-4 whitespace-nowrap text-[14px] poppins-thin text-gray-800">Total</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{parseSubtotal>100?parseSubtotal:parseSubtotal+15}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='w-full m-auto text-center '>
                      <button className='bg-black rounded-md text-white w-full m-auto p-2 my-5' onClick={handlePayment}>Place Order</button>
                    </div>

                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
