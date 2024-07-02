'use client';
import { Col, Form, Row } from 'antd';
import Container from 'components/Common/Container';
import { HeadingH6 } from 'components/Common/Heading';
import Input from 'components/Common/Input';
import SelectInput from 'components/Common/Selectinput';
import Footer from 'components/layout/Footer';
import Navbar from 'components/layout/Header/Navbar';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Para14, Para16 } from 'components/Common/Paragraph';
import Image from 'next/image';
import Link from 'next/link';
import Button from 'components/Common/Button';
import showToast from 'components/Toaster/Toaster';
const Checkout = () => {
  const [cartproduct, setCartProduct] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('subtotal');
  let Products = localStorage.getItem('cart');
  const ProductHandler = () => {
    let Products = localStorage.getItem('cart');

    if (Products && JSON.parse(Products).length > 0) {
      const cartItems = JSON.parse(Products || '[]');
      setCartProduct(cartItems);
      console.log(cartItems, 'cartItems');
    }
  };
  useEffect(() => {
    ProductHandler();
  }, []);
  console.log(Products);
  const parseSubtotal = search ? JSON.parse(search) : null;
  const [billingData, setBillingData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    street: '-',
    building: '-',
    floor: '-',
    apartment: '-',
    state: '',
    city: '-',
    country: '',
    address: '',
  });

  const handlePayment = async () => {
    try {
      let totalPayment =
        parseSubtotal > 100 ? parseSubtotal : parseSubtotal + 15;
      // Step 1: Authenticate and get the token
      const authResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/authenticate`,
      );
      const token = authResponse.data.token;

      // Step 2: Create the order
      const orderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/order`,
        { token, amount: totalPayment },
      );
      const orderId = orderResponse.data.orderId;

      // Step 3: Generate the payment key

      try {
        const paymentKeyResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/payment_key`,
          { token, orderId, amount: totalPayment, billingData },
        );
        const paymentKey = paymentKeyResponse.data.paymentKey;
        window.location.href = `${process.env.NEXT_PUBLIC_PAYMOD_BASE_URL}/iframes/${process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
      } catch (error) {
        showToast(
          'error',
          'Something is wrong. Please check the input fields.',
        );
      }

      // const checkPaymentStatus = async () => {
      //   const paymentStatusResponse = await axios.get(
      //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/status`,
      //     { params: { orderId } },
      //   );
      //   if (paymentStatusResponse.data.status === 'paid') {
      //     window.location.href = '/thank-you';
      //   } else if (paymentStatusResponse.data.status === 'failed') {
      //     window.location.href = '/payment-failed';
      //   } else {
      //     setTimeout(checkPaymentStatus, 5000); // Poll every 5 seconds
      //   }
      // };

      // checkPaymentStatus();
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBillingData({ ...billingData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'address') {
      const [building, street, city] = value
        .split(',')
        .map((part) => part.trim());
      setBillingData({
        ...billingData,
        street: street,
        building: building,
        city: city,
        address: value,
      });
    } else {
      setBillingData({ ...billingData, [name]: value });
    }
  };
  console.log(billingData, 'billingData');
  return (
    <>
      <Navbar />
      <Container className="mt-10 md:mt-20">
        <HeadingH6
          className="border-b-2 font-bold lg:pb-3"
          title={'Billing details'}
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
          <div>
            <Form layout="vertical">
              <Row gutter={[10, 0]}>
                <Col span={12}>
                  <Form.Item label={'First Name'}>
                    <Input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={billingData.first_name}
                      onChange={handleInputChange}
                      className="placeholder:!text-slate-400"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={'Last Name'}>
                    <Input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={billingData.last_name}
                      onChange={handleInputChange}
                      className="placeholder:!text-slate-400"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={'Email address'}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={billingData.email}
                      onChange={handleInputChange}
                      className="placeholder:!text-slate-400"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={'Phone'}>
                    <Input
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      name="phone_number"
                      placeholder="Phone"
                      value={billingData.phone_number}
                      onChange={handleInputChange}
                      className="placeholder:!text-slate-400"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={'Address'}>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Building, street, city etc"
                      value={billingData.address}
                      onChange={handleInputChange}
                      className="placeholder:!text-slate-400"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={'State'}>
                    <SelectInput
                      name="state"
                      placeholder={'State'}
                      value={billingData.state}
                      onChange={handleSelectChange}
                      selectoption={[
                        { title: 'Dubai' },
                        { title: 'Abu Dhabi' },
                        { title: 'Sharjah' },
                        { title: 'Ajman' },
                        { title: 'Ras Al Khaima' },
                        { title: 'Umm Al Quwain' },
                        { title: 'Fujairah' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={'Country/Region'}>
                    <SelectInput
                      name="country"
                      placeholder={'Country/Region'}
                      value={billingData.country}
                      onChange={handleSelectChange}
                      selectoption={[{ title: 'United Arab Emirates' }]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="p-2">
            <div className="flex border flex-col sticky top-24 p-4">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <HeadingH6
                    className="lg:mt-3 font-bold"
                    title={'Your order'}
                  />
                  <div className="overflow-hidden ">
                    <table className="min-w-full divide-y divide-gray-200 lg:mt-8 ">
                      <thead className="">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-[12px] font-normal text-gray-500 uppercase w-8/12"
                          >
                            PRODUCT
                          </th>
                          {/* <th
                            scope="col"
                            className="px-6 py-3 text-start text-[12px] font-normal text-gray-500 uppercase w-2/12"
                          >
                            QUANTITY
                          </th> */}
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-[12px] font-normal text-gray-500 uppercase w-2/12"
                          >
                            TOTAL
                          </th>
                        </tr>
                      </thead>

                      {cartproduct.length > 0 ? (
                        <>
                          <tbody className="divide-y divide-gray-200">
                            {cartproduct.map((array: any, index: number) => {
                              let color: string;
                              return (
                                <tr key={index}>
                                  <td className="px-2 py-2 text-sm ">
                                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                      <Image
                                        className="rounded-md"
                                        src={array.imageUrl[0].imageUrl}
                                        width={50}
                                        height={50}
                                        alt="cart image"
                                      />
                                      <div className="space-y-2">
                                        <Para14
                                          className="hover:underline transition duration-200"
                                          title={`${array.name} x ${array.count}`}
                                        />
                                      </div>
                                    </div>
                                  </td>

                                  {/* <td className="px-2 ">
                                    <Para14 title={array.count} />
                                  </td> */}
                                  <td className="px-2 ">
                                    <Para14
                                      icon={'AED '}
                                      title={array.totalPrice}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="flex justify-center">
                          Your Cart is empty
                        </div>
                      )}
                      <tbody>
                        <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border  ">
                          <td className="px-6 py-4  text-[14px] poppins-thin text-gray-800">
                            Products Prices
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {parseSubtotal ? parseSubtotal : ''}
                          </td>
                        </tr>

                        <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border placeholder:text-slate-400">
                          <td className="px-6 py-4 whitespace-nowrap text-[14px] poppins-thin text-gray-800">
                            Shippment Fee
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {parseSubtotal > 100 ? 'Free' : 15}
                          </td>
                        </tr>

                        <tr className="odd:bg-white hover:bg-gray-100 border-b-gray-200 border">
                          <td className="px-6 py-4 whitespace-nowrap text-[14px] poppins-thin text-gray-800">
                            Total
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {parseSubtotal > 100
                              ? parseSubtotal
                              : parseSubtotal + 15}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="w-full m-auto text-center ">
                      <button
                        className="bg-black rounded-md text-white w-full m-auto p-2 my-5"
                        onClick={handlePayment}
                      >
                        Place Order
                      </button>
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
