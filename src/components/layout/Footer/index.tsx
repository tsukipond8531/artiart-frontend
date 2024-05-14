"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'
import Logo from 'components/Common/Logo'
import Link from 'next/link'
import facebook from "../../../../public/assets/images/facebook.png"
import instagram from "../../../../public/assets/images/instagram.png"

const Footer = () => {
  const [category, setCategory] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
  
        );
        const Categories = await response.json();
        setCategory(Categories);
        setLoading(false)
  
      } catch (err) {
        console.log('err', err)
        setLoading(false)
      }
  
    };
  
    CategoryHandler()
  }, []);
  
  return (
    <>
    
<footer className="w-full mt-10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/*Grid*/}
    <div className="py-14 grid grid-cols-12 gap-x-5 gap-y-8">
      <div className="col-span-full xl:col-span-3 relative bg-[#d9d9d9] rounded-2xl gap-12 p-6 xl:w-72 h-96 flex flex-col justify-center items-center">
        <Logo className='flex justify-center lg:justify-start'/>
        <p className="text-center text-gray-900 ">Trusted in more than 100 countries &amp; 5 million customers.
          Have any query? contact us we are here for you.</p>
        <div className="flex  space-x-4 sm:justify-center  ">
          <Link href="https://www.facebook.com/artiartuae">
            <Image className="p-1 bg-white rounded-full shadow hover:shadow-2xl shadow-white" width={50} height={50} src={facebook} alt="facebook"/>
          </Link>
          <Link href="https://www.instagram.com/artiartuae/">
            <Image className="p-1 bg-white rounded-full shadow hover:shadow-2xl shadow-white" width={50} height={50} src={instagram} alt="instagram"/>
          </Link>
        </div>
      </div>
      <div className="block text-center xl:text-left xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 xl:pl-5">
        <h4 className="text-lg text-gray-900 font-bold mb-9">Get In Touch</h4>
        <ul className="text-gray-900 transition-all duration-500 grid gap-6">
          <li className='cursor-pointer' onClick={()=>{  

               const subject = "Contact Us";
            const url = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent("cs@artiart.ae")}&su=${encodeURIComponent(subject)}`;
            const ISSERVER = typeof window === "undefined"
  
            !ISSERVER ?     window.open(url, "_blank") : null}}
            > cs@artiart.ae</li>
          <li >+971 58 820 0549</li>
          <li>Shop 5, Khalil Al Sayegh Building, Oud Metha, Umm Hurair Road - 2nd St - Dubai</li>
        </ul>
      </div>
      <div className="block xl:py-16 col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3">
        <h4 className="text-lg text-gray-900 font-bold mb-9 text-center xl:text-left">Quick Links</h4>
        <div className="flex gap-6 xl:gap-12 max-xl:justify-center">
          <ul className="text-gray-600 transition-all duration-500 grid gap-2">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Products</Link>
            <Link href={"/corporate"}>Corporate Order</Link>
            <Link href={"/about"}>About Us</Link>
            <Link href={"/contact"}>Contact Us</Link>
          </ul>
          <ul className="text-gray-600 transition-all duration-500 grid gap-2">
            {category && category.length > 0 ? category.slice(0,4).map((item)=>{
              return (
                <Link
                  
                href={{
                  pathname: `/products/${item._id}`,
                  query: { Category: JSON.stringify(item) }
                }}
                
                
                key={item._id} >
  
                    {item.name}
                </Link>
          

              )
            }) : null }

          </ul>
        </div>
      </div>
      <div className="block xl:py-16 col-span-full md:col-span-4 xl:col-span-3">
        <h4 className="text-lg text-gray-900 font-bold mb-9 text-center xl:text-left">Newsletter</h4>
        <div className="grid gap-7 ">
          <input type="text" name="email" className="py-2 px-4 border border-gray-300 shadow-sm h-14 text-lg text-gray-800 rounded-full w-full  xl:w-64 placeholder:text-gray-400 focus:outline-none" placeholder="Enter email.." />
          <button type="submit" className="flex gap-2 justify-center items-center py-3.5 px-7 rounded-full text-white bg-black shadow-md w-fit transition-all duration-500 mx-auto xl:mx-0">Subscribe<svg width={17} height={13} viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 6.88281L14.8333 6.88281M10.6667 11.8828L15.0774 7.47207C15.3552 7.19429 15.4941 7.0554 15.4941 6.88281C15.4941 6.71022 15.3552 6.57133 15.0774 6.29356L10.6667 1.88281" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    {/*Grid*/}
  </div>
  <div className="py-4 bg-indigo-50 ">
    <div className="flex items-center justify-between  max-w-screen-xl mx-auto">
      <div className='space-x-4'>
        <Link href={"/privacy"}>Privacy Policy</Link>
        <Link href={"/terms"}>Terms & Condition</Link>
        <Link href={"/refund"}>Return and Refund</Link>
      </div>
      <span className="text-sm text-gray-800 ">Copyright@2024 All Right Reserved  by <Link href="/">Artiart</Link></span>
    </div>
  </div>
</footer>

                                            
 
    </>
  )
}

export default Footer