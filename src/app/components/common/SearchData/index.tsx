//@ts-nocheck
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { HeadingH4 } from "../Heading";
import { Para12, Para14, Para16 } from "../Paragraph";

const SearchData = () => {
  
 
    const truncateText = (text, maxLength) => {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
  
 

  return (
    <>
      <form className="relative border-none mt-6 mb-5 focus:border-primary-orange-200 ring-primary-orange-200">
        <div className="absolute inset-y-0 flex items-center  pl-3 pointer-events-none focus:border-primary-orange-200 ring-primary-orange-200">
          <svg
            className="w-4 h-4 text-main"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 bg-white text-black text-sm border-2  rounded ring-primary-orange-200"
          placeholder="Search"
        />
        <button
          type="submit"
          className="text-light absolute right-2.5 bottom-2.5 bg-primary-orange-200 text-white  transition duration-300 font-medium rounded text-sm px-4 py-2"
        >
          <FaArrowRight size={20} />
        </button>
      </form>
      
      <div className="max-h-[500px] overflow-auto pr-2 bg-white rounded-md p-2">
              <div className="mt-5 mb-6">
                <Link href={`/`} className="text-black hover:text-primary-orange-400 relative">
                  <div className="border p-2 pt-5 mb-2 flex items-center rounded-md shadow cursor-pointer hover:border-primary-orange-200 duration-300 transition">
                    <Para16
                      className="rounded-md font-medium bg-white w-20 text-center absolute md:left-3 -top-4 text-primary-orange-400"
                      title="Visa"
                    />
                    <div className="flex gap-3 w-11/12">
                    
                      <div>
                        <HeadingH4 title={"Pakistan"} />
                        <Para14 className="pl-1" title={truncateText("Islamabad", 160)} />
                      </div>
                    </div>
                    <Link href={`/`} className="hover:text-black mx-auto">
                      <FaArrowRight size={25} />
                    </Link>
                  </div>
                </Link>
              </div>
              
      </div>
    </>
  );
};

export default SearchData;