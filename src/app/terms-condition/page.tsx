import Container from "components/Common/Container";
import { HeadingH2, HeadingH6 } from "components/Common/Heading";
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
          <HeadingH2 className="" title={"Terms & Conditions–Artiart"} />
          <Para14
            title={
              "lease carefully consider this agreement before using this website. Artiart has all the right to amend this site, its services, T&Cs and Delivery Policy, Refund and Return Policy, and Shipping Policy. Also, Artiart has all the right to modify the services offered on the website and these conditions at any moment without previous notice."
            }
          />
          <HeadingH6 className="font-semibold" title={"Introduction:"} />
          <p>
            The Artiart Terms and Conditions (Terms) considered as a legal
            agreement between you and (User you or your) and ArtiArt
            Inc. (ArtiArt Company we our or us). These Terms and
            conditions, incorporated and presented after careful consideration
            govern and secure your use of our website located at www.artiart.com
            (Website) including all content that is posted, functionality
            and services offered on or through the Website by Artiart.
          </p>
          <p>
            Please carefully read these Terms and conditions before you start
            using the Website and the services offered. Our aim is to make this
            legal agreement as readable as possible.
          </p>
          <p>
            By accessing or using the Website to buy and use the services by
            Artiart, you are bound to accept these Terms and conditions. Also,
            it will be considered as a proof that you agree to the terms,
            conditions and notices contained on the website or referenced
            herein. If you do not agree to these Terms, you must not access or
            use the Website and its content or services provided by Artiart.
          </p>
          <p>
            To contact us please email us at:{" "}
            <Link href={"mailto:info@artiart.ae"}>info@artiart.ae</Link>
          </p>
          <HeadingH6
            className="font-semibold"
            title={
              " By using our website(artiart.ae) and services, you accept these terms:"
            }
          />
          <p>
            By using our Website, you agree and confirm that you accept these
            Terms and our Privacy Policy, and are bound to comply with them,
            incorporated here by reference. If you do not feel comfortable with
            these terms and conditions and wish to disagree, we respect your
            decision
          </p>
          <p>
            These T&Cs take effect from the date you first access our website.
            In addition to the general T&Cs mentioned in this page, you can also
            refer to Artiarts Delivery Policy, Refund & Return Policy, Shipping
            Policy before making any purchase from our website(artiart.ae).
            Please be advised that by agreeing to these general T&Cs, you are
            accepting the other T&Cs outlined in the Delivery Policy, Refund &
            Return Policy and Shipping Policy. These Policies are all part of a
            legally binding contract between Artiart and “you” (user of this
            website and services).
          </p>
          <p>
            By agreeing to these Terms, you represent and warrant that you are
            of legal age to use the website and the services provided by
            Artiart, under the law of the United Arab Emirates to form a binding
            contract with ArtiArt.
          </p>
          <HeadingH6
            className="font-semibold"
            title={"Updates of Terms and Services"}
          />
          <p>
            We may update or revise these Terms at any time at our sole
            discretion
          </p>
          <p>
            Please be advised that any modifications made to the Terms and
            Conditions of our Website(artiart.ae) will take effect immediately
            right away once they are updated. These changes and updates will
            apply to all future access and use of our website and services
            mentioned. By continuing to use the Website after the revised Terms
            have been posted, you are indicating your acceptance and agreement
            to the changes and updated TCs, Delivery Policy, Refund and Return
            Policy, and Shipping Policy.
          </p>
        <p> We strongly recommend you to regularly review and have a clear understanding of these Terms and Conditions that govern your use of the Website and its services. Whenever these Terms are updated we will update the Last Updated date at the top of this document.</p>
          <HeadingH6 className="font-semibold" title={"User Conduct"} />
          <p>
            It is imperative to adhere and comply with the terms of use when
            accessing the Website and its services. Users must avoid the
            following in order to access and engage with Artiarts website and
            its services in future.
          </p>
          <ul className="px-1 md:px-5 space-y-3">
            <li className="list-disc">
              Any action that violates any applicable federal, state local, or
              international law or regulation
            </li>
            <li className="list-disc">
              The transmission, reception, posting, downloading, use, or reuse
              of any content that does not conform to the guidelines for
              acceptable submissions provided in these terms of service
            </li>
            <li className="list-disc">
              The sending or arranging for the sending of any promotional or
              advertising materials.
            </li>
            <li className="list-disc">
              Impersonating the Company, an employee of the Company, another
              user, or any other entity or persona, including the use of email
              addresses associated with any of the aforementioned.
            </li>
          </ul>
          <p>
            Subject to these Terms, ArtiArt grants you a non-transferable,
            non-exclusive, revocable, limited license to access and use the
            Website exclusively for your personal, non-commercial use.
          </p>
          <p>
            It is advised that users abide by these rules to avoid any legal
            consequences or violation of the terms of service.
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Terms;
