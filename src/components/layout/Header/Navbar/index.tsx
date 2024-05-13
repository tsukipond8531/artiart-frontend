"use client";
import React, { useEffect, useState ,useRef} from "react";
import { IoIosArrowUp } from "react-icons/io";
import { TbMenu2 } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { Checkbox, Modal } from "antd";

import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaArrowRightLong, FaRegUser } from "react-icons/fa6";
import { HeadingH6 } from "components/Common/Heading";
import Container from "components/Common/Container";
import Logo from "components/Common/Logo";
import Navlink from "components/Common/NavLink/Navlink";
import Button from "components/Common/Button";
import SearchData from "components/Common/SearchData";
import Drawerfilter from "components/Common/Drawer";
import { Para14 } from "components/Common/Paragraph";


const Navbar: React.FC = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenFlag, setisOpenFlag] = useState();
  const inputRef = useRef<any>(null);

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
  const scrolledStyle = "bg-white/30 backdrop-blur-md"; // Reduced opacity and blur in dark mode
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
        console.log('working',  inputRef.current.focus)
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
    <div className="p-3 text-center border-b">
      <HeadingH6 className="text-10-important" title={"Welcome to our store"}/>
    </div>

      <nav className={` text-black  sticky top-0  z-20 shadow-md  ${scrollingUp ? defaultStyle : scrolledStyle}`}>
        <Container>
        <div className=" flex py-4 pt-2 pb-2 lg:gap-20">
          <div className="relative z-10">
            <Logo />
          </div>
          <div className="lg:flex lg:gap-10 items-center hidden ">
            <Navlink onDropdownClose={closeMobileMenu} />
          </div>
          <div className="flex gap-2 ml-auto items-center justify-center">

            <div className="flex items-center  gap-2 md:gap-5">
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
           <Link href={"/cart"}><AiOutlineShoppingCart size={20} /></Link>
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
              <Drawerfilter className="poppins-thin text-14  " title="Shop" endicon={<FaArrowRightLong size={20} />} DrawerContent={<>
                <div className="flex flex-col space-y-2">
                <Link className='poppins-thin text-14' href="/products">
                Suction Mugs
              </Link>
              <Link className='poppins-thin text-14' href="/products">
              Suction Bottle
              </Link>
              <Link className='poppins-thin text-14' href="/products">
              Insulated Suction Flasks
              </Link>
              
                </div>
                </>}/>
              <Link className='poppins-thin text-14' href="/corporate">
                Corporate Order
              </Link>
              <Link className='poppins-thin text-14' href="/about">
                About Us
              </Link>
              <Link className='poppins-thin text-14' href="/contact">
                Contact
              </Link>
            </div>
             </>}/>
    
            </div>
          </div>
        </div>
        </Container> 
      </nav>
    </>
  );
};

export default Navbar;
