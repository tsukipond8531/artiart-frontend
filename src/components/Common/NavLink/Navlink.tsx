//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DropDown from '../DropDown';

const Navlink = ({ onDropdownClose }) => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<any[]>();




  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };



  const handleClose = () => {
    setIsDropDownOpen(false);
  };


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

    CategoryHandler();
  }, []);

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
            items: category
          
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
