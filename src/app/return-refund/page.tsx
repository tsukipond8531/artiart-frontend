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
            <Para14 title={"Can I return my ArtiArt product if I change my mind?"}/>
            <ul className='px-1 md:px-5 space-y-3'>
            <li className='list-disc'>Yes, you may return any item within 14 days of receiving your order from us, providing the item is unopened, unused and with all original   packaging intact. </li>
                <li className='list-disc'>To initiate a return, please send an email to customer service at <Link className='underline' href={"mailto:cs@artiart.ae"}>cs@artiart.ae ,</Link> explaining clearly why you would like to return the item. Please also ensure your order number is included.   </li>
                <li className='list-disc'>Our team will get back to you within 24hrs and guide you through the return process and provide you with a return authorization number (RAN). Returns cannot be accepted without the RAN. </li>
                <li className='list-disc'>Once in receipt of your return, if deemed acceptable, we will issue the refund right away. The time for the refund to reflect in your account again varies from card issuer to card issuer, but from our side, it will be executed within 24 hours of an approved return. </li>
            </ul>
            <HeadingH6 className='font-semibold' title={"What if an item is defective?"}/>
        <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>In the rare event that your received item is deemed faulty, please follow the instructions above, except add FAULTY before the order number in the subject line. Your return will be treated as a priority and replacement sent out asap. </li>
                <li className='list-disc'>If the item has developed a fault after being used, we understand that it won’t be in it’s unused state but we would request you to keep all packaging until you are certain you wish to keep the item. </li>
            </ul>


        <HeadingH6 className='font-semibold' title={"Who covers the return shipping costs?"}/>
        <Para14 title={"If you need to return an item you bought from us, please note that you will have to pay for the return shipping unless the item is defective or we made a mistake."} />
        <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>We strongly recommend using a trackable shipping service, to make the return smoothly. This will help you and ArtiArt to see where your package is on its journey. This method will make sure the product arrives back on time.</li>
                <li className='list-disc'>If something happens to the item on the way, or if the item is lost by the courier, we cannot be held responsible and will not be able to offer a refund.</li>
            </ul>
            <HeadingH6 className='font-semibold' title={"Products Not Eligible for Replacement or Refund"}/>
        <Para14 title={"At ArtiArt, we have an aim to make sure of your satisfaction with every purchase. However, there are certain products and eligibility criteria that we are unable to replace or refund. Please review the list below for details:"} />
        <ul className='px-1 md:px-5 space-y-3'>
                <li className='list-disc'>Items sold during sales and promotion period</li>
                <li className='list-disc'>Items not in original condition, used or damaged</li>
            </ul>
            <HeadingH6 className='font-semibold' title={"Refund Process"}/>
            <Para14 title={"We will initiate the refund process immediately once we receive the product at Artiart's warehouse. The refund will be processed based on the original mode of payment for the order:"} />
            <Para14 title={"For orders paid by credit/debit card, refunds will be credited back to the original payment method within 1 working days upon receipt of the returned product. Please note that once the refund has been initiated, the time taken for the funds to reach your account varies between banks. We will send you a confirmation when we have completed everything from our side in case you need to take it up with your bank or card issuer. "} />
            <Para14 title={"For orders paid by cash, we will refund via bank deposit or transfer upon providing the necessary details. "} />

            <HeadingH6 className='font-semibold' title={"Contact Us:"}/>
        <Para14  title={<>If you have any questions or concerns about our return and refund policy, please contact us at <Link className='underline' href={"mailto:cs@artiart.ae"}>cs@artiart.ae.</Link>. Our customer service team is available to assist you from 9 am to 6 pm, Monday to Saturday (excluding public holidays).</>} />
        <Para14 title={"Thank you for choosing ArtiArt. "} />
        
       </div>
        </Container> 
<Footer/>
    </>
  )
}

export default Return