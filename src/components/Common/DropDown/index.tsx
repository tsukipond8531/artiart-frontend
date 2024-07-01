'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeadingH5 } from '../Heading';
import { generateSlug } from 'Data/data';

interface DropDownProps {
  array: Array<{
    Category: string;
    items: Array<{
      name: string;
      createdAt: string;
      updatedAt: string;
      _id: string;
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
  return (
    <div className={`inline-block ${textSize}`} id="dropDownId">
      <button
        onClick={toggleMenu}
        className={`inline-flex poppins-thin text-14 ${BtnClass}`}
        id="dropDownId"
      >
        {text}
        {icon}
      </button>
      {isOpen && (
        <div
          className={`fixed ${alignment} z-20 rounded-md shadow bg-white`}
          id="dropDownId"
        >
          {array &&
            array.map((arrayItem, index) => (
              <div key={index} onClick={onLinkClick} id="dropDownId">
                <HeadingH5 className="mb-3" title={arrayItem.Category} />
                {arrayItem.items &&
                  arrayItem.items.map((item, itemIndex) => (
                    <div key={item._id} id="dropDownId">
                      <Link
                        href={{
                          pathname: `/products/${generateSlug(item.name)}`,
                        }}
                        key={itemIndex}
                      >
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
