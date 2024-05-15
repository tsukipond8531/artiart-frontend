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
import Link from "next/link";


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
  
  const handleClick =()=>{

    const subject = "Contact Us";
    const url = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent("cs@artiart.ae")}&su=${encodeURIComponent(subject)}`;
    const ISSERVER = typeof window === "undefined"

    !ISSERVER ?     window.open(url, "_blank") : null
  }
  return (
    <>
      <Navbar />
      <Container className="mt-10 md:mt-20">
        <div className="flex flex-wrap md:flex-nowrap gap-0 md:gap-5 p-2">
          <div className="w-full md:w-1/2  ">
            <HeadingH3 className=" poppins-semibold" title={"Contact"} />
            <table className="text-start mt-3">
              <tbody className="space-x-3">
              <tr>
                <th className="text-start poppins-semibold w-1/6 lg:text-16 text-14">Call Support:</th>
                <td className="font-bold poppins-thin text-start w-3/6 lg:text-16 text-14">+971 58 820 0549</td>
              </tr>

              <tr>
                <th className="text-start poppins-semibold w-1/6">WhatsApp  :</th>
                <td className="font-bold poppins-thin text-start">+971 58 820 0549</td>
              </tr>


              <tr>
                <th className="text-start poppins-semibold w-1/6 lg:text-16 text-14 flex align-top">Email:</th>
                <td className="font-bold poppins-thin text-start lg:text-16 text-14"><Link href="mailto:cs@artiart.ae">cs@artiart.ae</Link></td>
              </tr>
              <tr>
                <th className="text-start poppins-semibold w-1/6">Address :</th>
                <td className="font-bold poppins-thin text-start"> Shop 5, Khalil Al Sayegh Building, Oud Metha, Umm Hurair Road - 2nd St - Dubai</td>
              </tr>

         
              </tbody>
            </table>     
            <div className="mt-7">
            <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14435.668236099693!2d55.3078729!3d25.2397184!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43f93ce538b3%3A0xcdfd02fa5f29d2ce!2sArti%20Art%20UAE%20-%20Suction%20Mugs%20Distributor!5e0!3m2!1sen!2sae!4v1715750104768!5m2!1sen!2sae" width="600" height="450" ></iframe>
            </div>
          </div>
          <div className="border border-gray-300 lg:d-block d-none"></div>
          <div className="w-full md:w-1/2 mt-10 md:mt-0 ">
            <form className="" onSubmit={(e)=>handleSubmit(e)} ref={formRef}>
              <Row className="" gutter={[10, 0]}>
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

                <Col className="mt-3"
                  xl={{ order: 1, span: 24 }}
                  lg={{ order: 1, span: 24 }}
                  md={{ order: 1, span: 24 }}
                  sm={{ order: 1, span: 24 }}
                  xs={{ order: 1, span: 24 }}
                >
                  <label className="poppins-semibold ">Phone Number</label>

                    <Input
                      type="number"
                      name="number"
                      placeholder="Phone Number"
                      label="Phone Number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                </Col>


                <Col className="mt-3"
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


                <Col className="mt-3"
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
