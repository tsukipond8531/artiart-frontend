import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeadingH5 } from '../Heading';

interface DropDownProps {
  array:
  
  Array<{
    Category: string;
    items: Array<{
      name: string;
      createdAt: string;
      updatedAt: string;
      _id:string
    }>;
  }>;
  text: string;
  icon: JSX.Element;
  onLinkClick: () => void;
  BtnClass: string;
  textSize?: string;
  alignment?: string;
  toggleMenu: () => void;
  isOpen: boolean;
}

const DropDown: React.FC<DropDownProps> = ({
  array,
  text,
  icon,
  onLinkClick,
  BtnClass,
  textSize = 'poppins-thin text-14 mt-0',
  alignment = 'left-0',
  toggleMenu,
  isOpen,
  ...otherProps
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, toggleMenu]);

  return (
    <div className={`inline-block ${textSize}`}>
      <button
        onClick={toggleMenu}
        className={`inline-flex poppins-thin text-14 ${BtnClass}`}
      >
        {text}
        {icon}
      </button>
      {isOpen && (
        <div
          className={`fixed ${alignment} z-20 rounded-md shadow bg-white`}
        >
          {array.map((arrayItem, index) => (
            <div key={index} 
            // ref={dropdownRef}
            onClick={onLinkClick}
            >
              <HeadingH5 className="mb-3" title={arrayItem.Category} />
              {arrayItem.items.map((item, itemIndex) => (
                <div  key={item._id}>
                  <Link
                  
                  href={{
                    pathname: "/products",
                    query: { Category: JSON.stringify(item) }
                  }}
                  
                  
                  key={itemIndex} >
                    <div className=" gap-3 md:gap-5 items-center rounded-md hover:bg-gray-300  px-2 py-2">
                      {item.name}
                   
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
