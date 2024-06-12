import Container from "components/Common/Container";
import { HeadingH2, HeadingH3, HeadingH6 } from "components/Common/Heading";
import { Para14 } from "components/Common/Paragraph";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import Link from "next/link";
import React from "react";

const Terms = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-10 md:mt-20">
        <div className="max-w-screen-md mx-auto space-y-5 ">
          <HeadingH3 className="" title={"Terms & Conditions–Elite Concepts General Trading LLC"} />
          <Para14
            title={
              "Please carefully consider this agreement before using this website. Elite Concepts General Trading LLC has all the rights to amend this site, its services, T&Cs and Delivery Policy, Refund and Return Policy, and Shipping Policy. Also, Elite Concepts General Trading LLC has all the right to modify the services offered on the website and these conditions at any moment without previous notice."
            }
          />
          <HeadingH6 className="font-semibold" title={"1)	Introduction:"} />
          <p>
          The Elite Concepts General Trading LLC Terms and Conditions (&apos;Terms&apos;) considered as a legal agreement between you and (&apos;User,&apos; &apos;you,&apos; or &apos;your&apos;) and Elite Concepts General Trading LLC, Inc. (&apos;Elite Concepts General Trading LLC,&apos; &apos;Company,&apos; &apos;we,&apos; &apos;our,&apos; or &apos;us&apos;). These Terms and Conditions, incorporated and presented after careful consideration, govern and secure your use of our website located at www.artiart.ae (&apos;website&apos;), including all content that is posted, functionality, and services offered on or through the website by Elite Concepts General Trading LLC.
          </p>
          <p>
          Please carefully read these Terms and Conditions before you start using the website and the services offered. Our aim is to make this legal agreement as readable as possible. 
          </p>
          <p>
          By accessing or using the website to buy and use the services by Elite Concepts General Trading LLC, you are bound to accept these terms and conditions. Also, it will be considered as a proof that you agree to the terms, conditions and notices contained on the website or referenced herein. If you do not agree to these terms, you must not access or use the website and its content or services provided by Elite Concepts General Trading LLC.
          </p>
          <p>
          To contact us please email us at: {" "}
            <Link className="underline" href={"mailto:cs@artiart.ae"}>cs@artiart.ae.</Link> 
          </p>
          <HeadingH6
            className="font-semibold"
            title={
              "2)	By using our website(www.artiart.ae) and services, you accept these terms: "
            }
          />
          <p>
          By using our website, you agree and confirm that you accept these terms and our Privacy Policy, and are bound to comply with them, incorporated here by reference. If you do not feel comfortable with these terms and conditions and wish to disagree, we respect your decision. 
          </p>
          <p>
          These T&Cs take effect from the date you first access our website. In addition to the general T&Cs mentioned in this page, you can also refer to Elite Concepts General Trading LLC’s Delivery Policy, Refund & Return Policy, Shipping Policy before making any purchase from our website (www.artiart.ae). Please be advised that by agreeing to these general T&Cs, you are accepting the other T&Cs outlined in the Delivery Policy, Refund & Return Policy and Shipping Policy. These policies are all part of a legally binding contract between Elite Concepts General Trading LLC and “you” (user of this website and services). 
          </p>
          <p>
          By agreeing to these terms, you represent and warrant that you are of legal age to use the website and the services provided by Elite Concepts General Trading LLC, under the law of the United Arab Emirates to form a binding contract with Elite Concepts General Trading LLC.
          </p>
          <HeadingH6
            className="font-semibold"
            title={"3)	Updates of Terms and Services"}
          />
          <p>
          We may update or revise these Terms at any time at our sole discretion. 
          </p>
          <p>
          Please be advised that any modifications made to the Terms and Conditions of our website (www.artiart.ae) will take effect immediately once they are updated. These changes and updates will apply to all future access and use of our website and services mentioned. By continuing to use the website after the revised terms have been posted, you are indicating your acceptance and agreement to the changes and updated T&Cs, Delivery Policy, Refund and Return Policy, and Shipping Policy. 
          </p>
        <p>We strongly recommend you to regularly review and have a clear understanding of these Terms and Conditions that govern your use of the website and its services. Whenever these terms are updated, we will update the &apos;Last Updated&apos; date at the top of this document.</p>
          <HeadingH6 className="font-semibold" title={"4)	User Conduct"} />
          <p>
          It is imperative to adhere and comply with the terms of use when accessing the website and its services. Users must avoid the following in order to access and engage with Elite Concepts General Trading LLC’s website and its services in future. 
          </p>
          <ul className="px-1 md:px-5 space-y-3">
            <li className="list-decimal">
            Any action that violates any applicable federal, state, local, or international law or regulation.
            </li>
            <li className="list-decimal">
            The transmission, reception, posting, downloading, use, or reuse of any content that does not conform to the guidelines for acceptable submissions provided in these terms of service.
            </li>
            <li className="list-decimal">
            The sending or arranging for the sending of any promotional or advertising materials.
            </li>
            <li className="list-decimal">
            Impersonating the company, an employee of the company, another user, or any other entity or persona, including the use of email addresses associated with any of the aforementioned.
            </li>
          </ul>
          <p>
          Subject to these Terms, Elite Concepts General Trading LLC grants you a non-transferable, non-exclusive, revocable, limited license to access and use the website exclusively for your personal, non-commercial use.
          </p>
          <p>
          It is advised that users abide by these rules to avoid any legal consequences or violation of the terms of service.
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Terms;
