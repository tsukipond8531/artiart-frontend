
//@ts-nocheck
import Link from 'next/link';
import React, { useState,  } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DropDown from '../DropDown';




const Navlink = ({ onDropdownClose }) => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };



  const handleClose = () => {
    setIsDropDownOpen(false);
  };



  return (
    <>
      <Link className='poppins-thin text-14' href="/" onClick={handleClose}>
        Home
      </Link>
      <Link className='poppins-thin text-14' href="/products" onClick={handleClose}>
        All Products
      </Link>
      <DropDown
         onLinkClick={handleClose}
         toggleMenu={toggleDropDown}
         isOpen={isDropDownOpen}
          alignment="sm:text-start p-3 "
          text="Shop"
          icon={
            <MdOutlineKeyboardArrowDown
              className="mt-1"
              aria-hidden="true"
            />
          }
          array={[
            {
              items: [
                { id: "1",  title: "Suction Mugs", href: "" },
                { id: "2", title: "Suction Bottle", href: "/products" },
                { id: "3", title: "Insulated Suction Flasks", href: "/products" },
                { id: "4", title: "Insulated Suction Mugs", href: "/products" },
                { id: "5", title: "Party Glass", href: "/products" },
                { id: "6", title: "Tea Pot", href: "/products" },
                { id: "7", title: "Suction Coffee Cups", href: "/products" },
              ],
            },
          ]}
        />

      <Link className='poppins-thin text-14 ' href="/corporate" onClick={handleClose}>
        Corporate Orders
      </Link>
      <Link className='poppins-thin text-14' href="/about" onClick={handleClose} >
        About Us
      </Link>
      <Link className='poppins-thin text-14' href="/contact" onClick={handleClose} >
        Contact
      </Link>
    </>
  );
};

export default Navlink;
