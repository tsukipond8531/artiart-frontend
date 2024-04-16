
//@ts-nocheck
import Link from 'next/link';
import React, { useState,  } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DropDown from '../DropDown';




const Navlink = ({ onDropdownClose }) => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
    if (isMegaMenuOpen) setIsMegaMenuOpen(false);
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
    if (isDropDownOpen) setIsDropDownOpen(false);
  };

  const handleClose = () => {
    setIsDropDownOpen(false);
    setIsMegaMenuOpen(false);
    if (onDropdownClose) onDropdownClose(); // Close mobile menu
  };



  return (
    <>
      <Link className='font-semibold' href="/" onClick={handleClose}>
        Home
      </Link>
      <Link className='font-semibold' href="/" onClick={handleClose}>
        All Product
      </Link>
      <div>
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
                { id: "1",  title: "Mug", href: "/chairman" },
                { id: "2", title: "Bottle", href: "/about" },
                { id: "3", title: "Glass",href: "/team" },
              ],
            },
          ]}
        />
      </div>

      <Link className='font-semibold' href="/gallery" onClick={handleClose}>
        Coporate Orders
      </Link>
      <Link className='font-semibold' href="/contact" onClick={handleClose} >
        About Us
      </Link>
    </>
  );
};

export default Navlink;
