"use client";

import { Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import Button from "components/Common/Button";
import Container from "components/Common/Container";
import { HeadingH3, HeadingH6 } from "components/Common/Heading";
import Input from "components/Common/Input";
import { Para14, Para16 } from "components/Common/Paragraph";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import React,{useState, useRef} from "react";
import { useForm, ValidationError } from '@formspree/react';
import emailjs from 'emailjs-com';


const Contact = () => {
  
  const formRef = useRef(null)


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
    subject: ""
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const form = e.target; // Access the form element
    console.log(formRef.current, 'form')
    if(!formRef.current) return null 
    // ts-ignore
    emailjs.sendForm('service_3le7kke', 'template_ewqxd3o', formRef.current,'ml1hpKGA9feca31Sb'
    )
    .then((result) => {
      console.log(result.text);
      alert('Email sent successfully!');
    })
    .catch((error) => {
      console.error(error.text);
      alert('Email sending failed!');
    });
  };
  
  return (
    <>
      <Navbar />
      <Container className="mt-10 md:mt-20">
        <div className="flex flex-wrap md:flex-nowrap gap-0 md:gap-5 p-2">
          <div className="w-full md:w-1/2  ">
            <HeadingH3 className=" poppins-semibold" title={"Contact"} />
            <div className="flex items-center gap-4 mt-5 ">
              <HeadingH6
                className="poppins-semibold"
                title={"Call Customer Services :"}
              />
              <Para16
                className="font-bold poppins-thin"
                title={"04-252-2025"}
              />
            </div>
            <div className=" lg:mb-10">
              <div className="flex items-center gap-5 mt-2">
                <HeadingH6 className="poppins-semibold" title={"Address :"} />
                <Para14
                  className="poppins-thin"
                  title={"23 22nd St - Al Quoz Industrial Area 4 - Dubai"}
                />
              </div>
              <div className="flex items-center gap-5 mt-2">
                <HeadingH6 className="poppins-semibold" title={"Email :"} />
                <Para14 className="poppins-thin" title={"cs@avenue39.com"} />
              </div>
            </div>
            <div className="mt-7">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4082.7742465747338!2d-79.38287617561478!3d43.64905556573276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2a57d767f%3A0x935ab2eb9fd5fb31!2sFirst%20Canadian%20Place!5e0!3m2!1svi!2s!4v1591603052999!5m2!1svi!2s"
                width="100%"
                height="100%"
                aria-hidden="false"
              ></iframe>
            </div>
          </div>
          <div className="border border-gray-300 lg:d-block d-none"></div>
          <div className="w-full md:w-1/2 mt-10 md:mt-0 ">
            <form className="" onSubmit={(e)=>handleSubmit(e)} ref={formRef}>
              <Row gutter={[10, 0]}>
                <Col
                  xl={{ order: 1, span: 12 }}
                  lg={{ order: 1, span: 12 }}
                  md={{ order: 1, span: 12 }}
                  sm={{ order: 1, span: 24 }}
                  xs={{ order: 1, span: 24 }}
                >
                  <label className="poppins-semibold">Your Name   </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      label="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                
                </Col>
                <Col
                  xl={{ order: 1, span: 12 }}
                  lg={{ order: 1, span: 12 }}
                  md={{ order: 1, span: 12 }}
                  sm={{ order: 1, span: 24 }}
                  xs={{ order: 1, span: 24 }}
                >
                  
                  <label className="poppins-semibold">Your Email   </label>

                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      label="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
              
                </Col>

                <Col
                  xl={{ order: 1, span: 24 }}
                  lg={{ order: 1, span: 24 }}
                  md={{ order: 1, span: 24 }}
                  sm={{ order: 1, span: 24 }}
                  xs={{ order: 1, span: 24 }}
                >
                  <label className="poppins-semibold">Phone Number</label>

                    <Input
                      type="number"
                      name="number"
                      placeholder="Phone Number"
                      label="Phone Number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                </Col>


                <Col
                  xl={{ order: 1, span: 24 }}
                  lg={{ order: 1, span: 24 }}
                  md={{ order: 1, span: 24 }}
                  sm={{ order: 1, span: 24 }}
                  xs={{ order: 1, span: 24 }}
                >
                  <label className="poppins-semibold">Subject</label>

                    <Input
                      type="text"
                      name="subject"
                      placeholder="subject"
                      label="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                </Col>


                <Col
                  xl={{ order: 1, span: 24 }}
                  lg={{ order: 1, span: 24 }}
                  md={{ order: 1, span: 24 }}
                  sm={{ order: 1, span: 24 }}
                  xs={{ order: 1, span: 24 }}
                >
      
                  <label className="poppins-semibold">Message</label>

                    <TextArea rows={4} placeholder="Message"  name="message" maxLength={6} value={formData.message}
                      onChange={handleChange} />
                </Col>
              </Row>
              <Button
                    type= 'submit'
                className="bg-black text-white py-3 px-5 rounded-none mt-3"
                title={"Send Message"}
              />
            </form>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
