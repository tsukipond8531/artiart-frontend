import Container from 'components/Common/Container'
import { HeadingH2, HeadingH4, HeadingH5, HeadingH6 } from 'components/Common/Heading'
import { Para14 } from 'components/Common/Paragraph'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import Link from 'next/link'
import React from 'react'

const Privacy = () => {
  return (
    <>
    <Navbar/>
         <Container className='mt-10 md:mt-20'>
        <div className='max-w-screen-md mx-auto space-y-5 '>
            <HeadingH2 className='' title={"Privacy Policy"}/>
            <Para14 title={"This Privacy Policy explains how Artiart collects, uses, disclose, and safeguard your information when you visit our website (artiart.ae), engage with our services (collectively, Services). We value your privacy and we make sure to protect your personal data in compliance with the laws of the United Arab Emirates"}/>
            <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>We present this Privacy Policy to clarify how we handle your information when you use our Services</li>
                <li className='list-disc'>Artiart collects personal information including: your name, email address, telephone number, physical address.</li>
                <li className='list-disc'>Additional information could be: age, gender, hobbies, interests, and other related information</li>
                <li className='list-disc'>Artiart collects information, such as credit card numbers, bank details, and payment information in case you make a purchase. We make sure your personal details are kept confidential and secure in accordance with industry standards and laws of United Arab Emirates</li>
                <li className='list-disc'>e may collect usage data such as IP addresses, browser types, operating
                    systems, device information, and cookies. These data points help to
                    improve our Services and provide you with a superior user experience.</li>
                                    <li className='list-disc'>We are committed to preserving your privacy and ensuring your
                    satisfaction with our Services.</li>
            </ul>
        <HeadingH6 className='font-semibold' title={"Use of Your Information"}/>
        <Para14 title={"We may use your information to:"} />
        <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>Provide, operate, and maintain our Services.</li>
                <li className='list-disc'>Improve, personalize, and expand our Services</li>
                <li className='list-disc'>Develop new products, services, features, and functionality.</li>
                <li className='list-disc'>Product marketing and promotion (directly or through one of our partners) to provide you with updates and other information relating to the website.</li>
                <li className='list-disc'>Process your transactions and payments.</li>
                <li className='list-disc'>Find and prevent fraud.</li>
            </ul>
            <HeadingH6 className='font-semibold' title={"Disclosure of Your Information"}/>
        <Para14 title={"We may share information we have collected about you in certain situations:"} />
        <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity.</li>
                <li className='list-disc'> When required by law, subpoena, or other legal process, or if we believe in good faith that such action is necessary to:</li>
                <li className='list-disc'>Enforce our legal rights or protect the security or integrity of our Services.</li>
                <li className='list-disc'> As per our privacy policy, we will retain your personal information only as long as it is necessary to fulfill the purposes for which it was collected. </li> 
            </ul>
            <HeadingH6 className='font-semibold' title={"Data Security"}/>
            <Para14 title={"We have a proper system of organizational and technical security measures in place to protect your data and privacy. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. :"} />
            <HeadingH6 className='font-semibold' title={"Changes to This Privacy Policy"}/>
            <Para14 title={"We may update this Privacy Policy in accordance with the laws and regulations. The updated version will be indicated by an updated last updated date and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information. "} />
            <HeadingH6 className='font-semibold' title={"Contact Us"}/>
            <Para14 title={<>If you have any questions or concerns about this Privacy Policy, please contact us at <Link className='underline' href={"mailto:cs@artiart.ae"}>cs@artiart.ae.</Link>  </>}/>
       </div>
        </Container> 
<Footer/>
    </>
  )
}

export default Privacy