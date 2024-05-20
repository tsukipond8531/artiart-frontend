import Container from 'components/Common/Container'
import { HeadingH2, HeadingH6 } from 'components/Common/Heading'
import { Para14 } from 'components/Common/Paragraph'
import Footer from 'components/layout/Footer'
import Navbar from 'components/layout/Header/Navbar'
import Link from 'next/link'
import React from 'react'

const Return = () => {
  return (
    <>
    <Navbar/>
         <Container className='mt-10 md:mt-20'>
        <div className='max-w-screen-md mx-auto space-y-5 '>
            <HeadingH2 className='' title={"Return and Refund Policy"}/>
            <Para14 title={"Can I cancel my purchase after placing an order?"}/>
            <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>If you want to cancel an order after making a purchase, please contact us via email at <Link className='underline' href={"mailto:cs@artiart.ae"}>cs@artiart.ae.</Link> or through the website dashboard. </li>
                <li className='list-disc'>If you have already made the payment, it will take approximately 4-5 working days for us to process the refund and for the money to be credited back to your bank account. </li>
                <li className='list-disc'>Any payment delays are the responsibility of your bank.</li>
            </ul>
        <HeadingH6 className='font-semibold' title={"Can I return my Artiart product?"}/>
        <Para14 title={"Yes, but we have a Return and Refund policy. "} />
        <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>We accept your returns within 14 days of receiving your order from Artiart. </li>
                <li className='list-disc'>To initiate a return, you need to contact the Artiart customer support team by emailing at <Link className='underline' href={"mailto:cs@artiart.ae"}>cs@artiart.ae.</Link></li>
                <li className='list-disc'>Develop new products, services, features, and functionality.</li>
                <li className='list-disc'>Product marketing and promotion (directly or through one of our partners) to provide you with updates and other information relating to the website.</li>
                <li className='list-disc'>In the next step you have to provide your order number and the reason for the return in the email. Please make sure to write the information carefully in order to get a response promptly. </li>
                <li className='list-disc'>Our team will further guide you through the return process and provide you with a return authorization number (RAN).</li>
            </ul>
            <HeadingH6 className='font-semibold' title={"What are the conditions to return an Artiart product?"}/>
        <Para14 title={"To be eligible for a return:"} />
        <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>If we reorganize or sell all or a portion of our assets, undergo a merger, or are acquired by another entity.</li>
                <li className='list-disc'> When required by law, subpoena, or other legal process, or if we believe in good faith that such action is necessary to:</li>
                <li className='list-disc'>Enforce our legal rights or protect the security or integrity of our Services.</li>
                <li className='list-disc'> As per our privacy policy, we will retain your personal information only as long as it is necessary to fulfill the purposes for which it was collected. </li> 
            </ul>
            <HeadingH6 className='font-semibold' title={"Who covers the return shipping costs?"}/>
        <Para14 title={"If you need to return an item you bought from us, please note that you will have to pay for the return shipping unless the item is defective or we made a mistake."} />
            <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>We strongly recommend using a trackable shipping service, to make the return smoothly. This will help you and Artiart to see where your package is on its journey. This method will make sure the product arrives back on time.</li>
                <li className='list-disc'>If something happens to the item on the way, we cant offer you a refund or replacement.</li>
            </ul>
        <Para14 title={"We know returning a product can be inconvenient. We aim to make this process as simple and hassle-free as possible for Artiart customers. "} />

            <HeadingH6 className='font-semibold' title={"Products Not Eligible for Replacement or Refund"}/>
        <Para14 title={"At Artiart, we have an aim to make sure of your satisfaction with every purchase. However, there are certain products and eligibility criteria that we are unable to replace or refund. Please review the list below for details:"} />
            <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>Items sold during sales and promotion period</li>
                <li className='list-disc'>Items not in original condition, used or damaged</li>
            </ul>
        
            <HeadingH6 className='font-semibold' title={"Refund Process"}/>
        <Para14 title={"We will initiate the refund process immediately once we receive the product at Artiart's warehouse. The refund will be processed based on the original mode of payment for the order:"} />
        <Para14 title={"For orders paid by credit/debit card, refunds will be credited back to the original payment method within 5-7 working days upon receipt of the returned product. For orders paid by cash, we will refund via bank deposit or transfer upon providing the necessary details. We will not be responsible for any delay of the payment from the bank."} />
        <HeadingH6 className='font-semibold' title={"Contact Us:"}/>
        <Para14  title={<>If you have any questions or concerns about our return and refund policy, please contact us at <Link className='underline' href={"mailto:cs@artiart.ae"}>cs@artiart.ae.</Link>. Our customer service team is available to assist you from 9 am to 6 pm, Monday to Saturday (excluding Sundays and public holidays). </>} />
        <Para14 title={"Thank you for choosing Artiart. "} />
        
       </div>
        </Container> 
<Footer/>
    </>
  )
}

export default Return