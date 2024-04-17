
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
      <Link className='font-semibold' href="/" onClick={handleClose}>
        Home
      </Link>
      <Link className='font-semibold' href="/" onClick={handleClose}>
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
                { id: "1",  title: "Suction Mugs", href: "/" },
                { id: "2", title: "Suction Bottles", href: "/" },
                { id: "3", title: "Insulated Suction Flasks", href: "/" },
                { id: "4", title: "Insulated Suction Mugs", href: "/" },
              ],
            },
          ]}
        />

      <Link className='font-semibold' href="/" onClick={handleClose}>
        Corporate Orders
      </Link>
      <Link className='font-semibold' href="/about" onClick={handleClose} >
        About Us
      </Link>
    </>
  );
};

export default Navlink;
