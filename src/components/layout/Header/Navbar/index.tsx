"use client";
import React, { useEffect, useState ,useRef} from "react";
import { TbMenu2 } from "react-icons/tb";
import {  IoSearchSharp } from "react-icons/io5";
import {  Modal } from "antd";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaArrowRightLong, FaFacebookF, FaRegUser,  } from "react-icons/fa6";
import Container from "components/Common/Container";
import Logo from "components/Common/Logo";
import Navlink from "components/Common/NavLink/Navlink";
import Button from "components/Common/Button";
import SearchData from "components/Common/SearchData";
import Drawerfilter from "components/Common/Drawer";
import Image from "next/image";
import whatsapp from "../../../../../public/assets/images/whatsapp.png"
import call from "../../../../../public/assets/images/call.svg"
import { PiBag } from 'react-icons/pi';


const Navbar: React.FC = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenFlag, setisOpenFlag] = useState();
  const inputRef = useRef<any>(null);
  const [category, setCategory] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
 


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY < 5) {
      setScrollingUp(true);
    } else {
      setScrollingUp(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Define the styles for default and scrolled states
  const defaultStyle = "bg-white/100"; // Full opacity or no blur in dark mode
  const scrolledStyle = "bg-white md:bg-white/30 backdrop-blur-md"; // Reduced opacity and blur in dark mode
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const toggleModal = (idx: any, target: any) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  useEffect(() => {
    const focusHandler =()=>{
      if( inputRef.current && open){
      inputRef.current.focus() 
    }
    else{
      console.log('working', open)

      inputRef.current && inputRef.current.blur()
    }
    }
    focusHandler()
  }, [open]);

  


  return (
    <>

      <nav className={` text-black border-t  sticky top-0  z-20 shadow-md  ${scrollingUp ? defaultStyle : scrolledStyle}`}>
        <Container>
        <div className=" flex py-4 pt-2 pb-2 lg:gap-20">
          <div className="relative z-10">
            <Logo />
          </div>
          <div className="lg:flex lg:gap-10 items-center hidden ">
            <Navlink onDropdownClose={closeMobileMenu} />
          </div>
          <div className="flex gap-2 ml-auto items-center justify-center">

            <div className="flex items-center  gap-3 md:gap-5">
              <Button className="bg-transparent text-black group"  onClick={() => {setOpen(true)}} title={<IoSearchSharp className="text-black" size={25} /> }/>
              <Modal
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[]}
                width={1000}
              >
                <SearchData inputRef={inputRef} />
              </Modal>
           <Link href={"/account"}><FaRegUser size={20} /></Link>


           <Link className='relative group' href={"/cart"}>
                  <div className='rounded-full text-dark w-5 h-5 p-[12px] bg-black text-white text-[14px] absolute bottom-2 left-3 flex justify-center items-center transition duration-200 ease-in'>
                    1
                  </div>
                  <PiBag   className='transition duration-200 ease-in' size={28} />

                </Link>
    
           <div className="flex pl-5  space-x-2 md:space-x-4 sm:justify-center  ">
          <Link href="https://www.facebook.com/artiartuae" className="w-7   h-7   rounded-full  flex justify-center items-center shadow-md hover:shadow">
          <FaFacebookF  className='text-blue-600' />
          </Link>
          <Link href="https://www.instagram.com/artiartuae/" className="w-7   h-7   rounded-full  flex justify-center items-center shadow-md hover:shadow">
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
            <div className="lg:hidden">

            <Drawerfilter className=" " icon={<TbMenu2 size={25}  />} DrawerContent={<>
            <div className="flex flex-col space-y-2">
            <Link className='poppins-thin text-14' href="/">
                Home
              </Link>
              <Link className='poppins-thin text-14' href="/products">
                All Products
              </Link>
              <Drawerfilter className="poppins-thin text-16  " title="Shop" endicon={<FaArrowRightLong size={15} />} DrawerContent={<>
                <div className="flex flex-col space-y-2">
                {category && category.length > 0 ? category.map((item)=>{
              return (
                <Link href={{ pathname: `/products/${item._id}`}} key={item._id} >
                    {item.name}
                </Link>
              )
            }) : null }
              
                </div>
                </>}/>
              <Link className='poppins-thin text-14' href="/corporate">
                Corporate Order
              </Link>
              <Link className='poppins-thin text-14' href="/about">
                About Us
              </Link>
              <Link className='poppins-thin text-14' href="/contact">
              Contact Us
              </Link>
            </div>
             </>}/>
    
            </div>
          </div>
        </div>
        </Container> 
      </nav>
      <Link href={"https://api.whatsapp.com/send/?phone=971588200549&text&type=phone_number&app_absent=0"} className=" fixed lg:bottom-10 bottom-20 right-10 z-50">
        <Image className="bg-white p-1 shadow-md rounded-full lg:w-14 w-9" src={whatsapp} alt="whatsapp"/>
      </Link>
      <Link href={"tel:+971 58 820 0549"} className=" fixed lg:bottom-10 bottom-20 left-10 z-50">
      <Image className="bg-white p-1 shadow-md rounded-full lg:w-14 w-9"  src={call} alt="call"/>

      </Link>
    </>
  );
};

export default Navbar;
