"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'
import Logo from 'components/Common/Logo'
import Link from 'next/link'
import { FaFacebookF } from "react-icons/fa6";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";



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
  <hr />
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/*Grid*/}
    <div className="py-12 grid grid-cols-12 gap-x-5 gap-y-8">
      <div className="col-span-full xl:col-span-3 py-8 relative bg-[#d9d9d9] rounded-2xl gap-6 p-4 xl:w-72 flex flex-col justify-center items-center">
        <Logo className='flex justify-center lg:justify-start'/>
        <p className="text-center text-gray-900 text-14">Trusted in more than 100 countries &amp; 5 million customers.
          Have any query? contact us we are here for you.</p>
          <div className="flex  space-x-4 sm:justify-center  ">
          <Link href="https://www.facebook.com/artiartuae" className="w-9 h-9 rounded-full  flex justify-center items-center hover:shadow-md">
          <FaFacebookF size={18} className='text-blue-600' />
          </Link>
          <Link href="https://www.instagram.com/artiartuae/" className="w-9 h-9 rounded-full  flex justify-center items-center hover:shadow-md">
            <svg className="w-[1.25rem] h-[1.125rem]" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.20975 7.81944C5.20975 6.54106 6.26102 5.50444 7.5582 5.50444C8.85537 5.50444 9.90721 6.54106 9.90721 7.81944C9.90721 9.09783 8.85537 10.1344 7.5582 10.1344C6.26102 10.1344 5.20975 9.09783 5.20975 7.81944ZM3.93991 7.81944C3.93991 9.78889 5.55982 11.3853 7.5582 11.3853C9.55658 11.3853 11.1765 9.78889 11.1765 7.81944C11.1765 5.85 9.55658 4.25356 7.5582 4.25356C5.55982 4.25356 3.93991 5.85 3.93991 7.81944ZM10.4741 4.11217C10.4741 4.27698 10.5236 4.43812 10.6165 4.5752C10.7093 4.71228 10.8413 4.81914 10.9958 4.88227C11.1503 4.94541 11.3203 4.96198 11.4844 4.92989C11.6484 4.8978 11.7991 4.81849 11.9174 4.70199C12.0357 4.58549 12.1163 4.43704 12.149 4.2754C12.1817 4.11376 12.165 3.9462 12.1011 3.79391C12.0371 3.64161 11.9288 3.51142 11.7898 3.41979C11.6508 3.32817 11.4873 3.27923 11.3201 3.27917H11.3197C11.0955 3.27927 10.8806 3.36705 10.722 3.52324C10.5635 3.67943 10.4743 3.89124 10.4741 4.11217ZM4.71142 13.4721C4.02442 13.4412 3.65101 13.3284 3.40286 13.2332C3.07387 13.1069 2.83914 12.9566 2.59235 12.7137C2.34555 12.4708 2.19278 12.2397 2.06527 11.9155C1.96854 11.6711 1.8541 11.3029 1.82287 10.6259C1.78871 9.89389 1.78189 9.674 1.78189 7.8195C1.78189 5.965 1.78927 5.74572 1.82287 5.01311C1.85416 4.33606 1.96944 3.96867 2.06527 3.7235C2.19335 3.39928 2.34589 3.16794 2.59235 2.92472C2.8388 2.6815 3.07331 2.53094 3.40286 2.40528C3.6509 2.30994 4.02442 2.19717 4.71142 2.16639C5.45417 2.13272 5.67729 2.126 7.5582 2.126C9.4391 2.126 9.66244 2.13328 10.4058 2.16639C11.0928 2.19722 11.4656 2.31083 11.7144 2.40528C12.0434 2.53094 12.2781 2.68183 12.5249 2.92472C12.7717 3.16761 12.9239 3.39928 13.052 3.7235C13.1487 3.96794 13.2631 4.33606 13.2944 5.01311C13.3285 5.74572 13.3354 5.965 13.3354 7.8195C13.3354 9.674 13.3285 9.89328 13.2944 10.6259C13.2631 11.3029 13.1481 11.6709 13.052 11.9155C12.9239 12.2397 12.7714 12.4711 12.5249 12.7137C12.2784 12.9564 12.0434 13.1069 11.7144 13.2332C11.4663 13.3285 11.0928 13.4413 10.4058 13.4721C9.66306 13.5057 9.43994 13.5124 7.5582 13.5124C5.67645 13.5124 5.45395 13.5057 4.71142 13.4721ZM4.65307 0.917056C3.90294 0.950722 3.39035 1.06794 2.9427 1.23961C2.4791 1.41689 2.08663 1.65472 1.69446 2.04061C1.30228 2.4265 1.06157 2.81389 0.881687 3.27078C0.707498 3.71222 0.588554 4.21711 0.554392 4.95639C0.519667 5.69683 0.511719 5.93356 0.511719 7.81944C0.511719 9.70533 0.519667 9.94206 0.554392 10.6825C0.588554 11.4218 0.707498 11.9267 0.881687 12.3681C1.06157 12.8247 1.30233 13.2126 1.69446 13.5983C2.08658 13.984 2.4791 14.2215 2.9427 14.3993C3.39119 14.5709 3.90294 14.6882 4.65307 14.7218C5.40479 14.7555 5.6446 14.7639 7.5582 14.7639C9.4718 14.7639 9.712 14.7561 10.4633 14.7218C11.2135 14.6882 11.7258 14.5709 12.1737 14.3993C12.637 14.2215 13.0298 13.9842 13.4219 13.5983C13.8141 13.2124 14.0543 12.8247 14.2347 12.3681C14.4089 11.9267 14.5284 11.4218 14.562 10.6825C14.5962 9.9415 14.6041 9.70533 14.6041 7.81944C14.6041 5.93356 14.5962 5.69683 14.562 4.95639C14.5278 4.21706 14.4089 3.71194 14.2347 3.27078C14.0543 2.81417 13.8135 2.42711 13.4219 2.04061C13.0304 1.65411 12.637 1.41689 12.1743 1.23961C11.7258 1.06794 11.2135 0.950167 10.4639 0.917056C9.71256 0.883389 9.47236 0.875 7.55876 0.875C5.64516 0.875 5.40479 0.882833 4.65307 0.917056Z" fill="url(#paint0_linear_9147_17049)" />
              <defs>
                <linearGradient id="paint0_linear_9147_17049" x1="14.6041" y1="1.67072" x2="0.399812" y2="14.3286" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" />
                  <stop offset="0.993738" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
    
        </div>
      </div>
      <div className="block  xl:text-left  col-span-full min-[500px]:col-span-6 md:col-span-4 xl:col-span-3 xl:pl-5">
        <h4 className="text-lg text-gray-900 font-bold lg:mb-9 mb-5">Get In Touch</h4>
        <ul className="text-gray-900 transition-all duration-500 grid gap-4 text-14 pr-8">
          <li className='cursor-pointer flex gap-3 items-center' onClick={()=>{  

               const subject = "Contact Us";
            const url = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent("cs@artiart.ae")}&su=${encodeURIComponent(subject)}`;
            const ISSERVER = typeof window === "undefined"
  
            !ISSERVER ?     window.open(url, "_blank") : null}}
            > <span className="text-[20px]"><HiOutlineMailOpen /> </span>cs@artiart.ae</li>
           <li className="cursor-pointer flex gap-3 items-center" ><span className="text-[18px]"><FiPhoneCall /></span><Link href={"tel:+971 58 820 0549"}>+971 58 820 0549</Link></li>
           <li className="cursor-pointer flex gap-3 items-center"><span className="text-[20px]"><TbDeviceLandlinePhone /></span><Link href={"tel:+97145899888"}>+971 4 589 9888</Link></li>
            <li className="cursor-pointer flex gap-3 items-top"><span className="text-[20px]"><IoLocationOutline /> </span><Link href={"https://maps.app.goo.gl/2gsB3J2XnnBGQ1ao9"}>Shop 5, Khalil Al Sayegh Building, Oud Metha, Umm Hurair Road - 2nd St - Dubai</Link></li>
        </ul>
      </div>
      <div className="block  col-span-6 min-[500px]:col-span-6 md:col-span-4 xl:col-span-2">
        <h4 className="text-lg text-gray-900 font-bold lg:mb-9 mb-5 xl:text-left">Quick Links</h4>
        <div className="flex gap-6 xl:gap-12">
          <ul className=" transition-all duration-500 grid gap-2 text-14">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Products</Link>
            <Link href={"/corporate"}>Corporate Order</Link>
            <Link href={"/about"}>About Us</Link>
            <Link href={"/contact"}>Contact Us</Link>
          </ul>
      
        </div>
     
      </div>
      <div className="block  col-span-6 md:col-span-4 xl:col-span-2">
        <h4 className="text-lg text-gray-900 font-bold lg:mb-9 mb-5 xl:text-left">Our Product</h4>
        <ul className="transition-all duration-500 grid gap-2 text-14">
            {category && category.length > 0 ? category.map((item)=>{
              return (
                <Link href={{ pathname: `/products/${item._id}`}} key={item._id} >
                    {item.name}
                </Link>
              )
            }) : null }
          </ul>
      </div>
      <div className="block  col-span-full md:col-span-4 xl:col-span-2">
        <h4 className="text-lg text-gray-900 font-bold lg:mb-9 mb-5 text-center xl:text-left">Subscribe Newsletter</h4>
        <div className="border border-slate-700 flex rounded-full w-fit ">
          <input type="text" name="email" className="bg-transparent focus:outline-none pl-4 text-gray-800 text-lg w-fit" placeholder="Enter email.." />
          <button type="submit" className="bg-black duration-500 flex h-10 items-center justify-center mx-auto px-4 py-0 rounded-full shadow-md text-12 text-white transition-all w-fit xl:mx-0"><svg width={17} height={13} viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 6.88281L14.8333 6.88281M10.6667 11.8828L15.0774 7.47207C15.3552 7.19429 15.4941 7.0554 15.4941 6.88281C15.4941 6.71022 15.3552 6.57133 15.0774 6.29356L10.6667 1.88281" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    {/*Grid*/}
  </div>
  <div className="py-2 bg-indigo-50 ">
    <div className="flex flex-wrap md:flex-nowrap items-center lg:text-lef text-center justify-between  max-w-screen-xl mx-auto">
      <div className='space-x-4 px-1 text-12'>
        <Link className="underline " href={"/privacy-policy"}>Privacy Policy</Link>
        <Link className="underline" href={"/terms-condition"}>Terms & Condition</Link>
        <Link className="underline" href={"/return-refund"}>Return and Refund</Link>
        <Link className="underline" href={"/shipping-policy"}>Shipment Policy</Link>
      </div>
      <span className="text-12 text-gray-800 lg:text-center mt-2 lg:mr-auto m-auto">Copyright@2024 All Right Reserved  by <Link href="/">Artiart</Link></span>
    </div>
  </div>
</footer>

                                            
 
    </>
  )
}

export default Footer