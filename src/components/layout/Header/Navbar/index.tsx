"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { TbMenu2 } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { Modal } from "antd";

import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { HeadingH6 } from "components/Common/Heading";
import Container from "components/Common/Container";
import Logo from "components/Common/Logo";
import Navlink from "components/Common/NavLink/Navlink";
import Button from "components/Common/Button";
import SearchData from "components/Common/SearchData";


const Navbar: React.FC = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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


  return (
    <>
    <div className="p-3 text-center border-b">
      <HeadingH6 title={"Welcome to our store"}/>
    </div>

      <nav className={` text-black  sticky top-0  z-20 shadow-md  ${scrollingUp ? defaultStyle : scrolledStyle}`}>
        <Container>
        <div className=" flex justify-between py-4 pt-2 pb-2 ">
          <div className="relative z-10">
            <Logo />
          </div>
          <div className="lg:flex  lg:gap-10 items-center hidden ">
            <Navlink onDropdownClose={closeMobileMenu} />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 md:gap-5">
              <Button className="bg-transparent text-black group"  onClick={() => setOpen(true)} title={<IoSearchSharp className="text-black" size={25} /> }/>
              <Modal
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[]}
                width={1000}
              >
                <SearchData />
              </Modal>
           <Link href={"/account"}><FaRegUser size={20} /></Link>
           <Link href={"/cart"}><AiOutlineShoppingCart size={20} /></Link>
            </div>
            <div className="lg:hidden mt-[9px]">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center  text-black  rounded-lg p-2 hover:bg-primary-orange-300 hover:text-white transition duration-300"
              >
                {mobileMenuOpen ? (
                  <IoIosArrowUp size={25} className="text-2xl mt-[5px]" />
                ) : (
                  <TbMenu2 size={25} className="text-2xl mt-[5px]" />
                )}
              </button>
              {mobileMenuOpen  && (
                <div
                  className={`absolute -z-10 inset-x-0  h-screen origin-top rounded-b-2xl px-6 pb-6 pt-10 bg-white
                    `}
                >
                  <div className="space-y-4  flex-col flex z-50">
                    <Navlink onDropdownClose={closeMobileMenu} />
                  </div>
                 
                </div>
              )}
            </div>
          </div>
        </div>
        </Container> 
      </nav>
    </>
  );
};

export default Navbar;
