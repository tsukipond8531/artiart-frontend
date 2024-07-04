//@ts-nocheck
'use Client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { HeadingH4 } from '../Heading';
import { Para12, Para14, Para16 } from '../../Common/Paragraph';
import axios from 'axios';
import { generateSlug } from 'Data/data';

interface PROPS {
  inputRef: any;
}

const SearchData = ({ inputRef }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`,
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
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
          value={searchTerm} // Bind input value to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
          ref={inputRef}
          autofocus="true"
        />
        <button
          type="submit"
          className="text-light absolute right-2.5 bottom-2.5 bg-primary-orange-200 text-white  transition duration-300 font-medium rounded text-sm px-4 py-2"
        >
          <FaArrowRight size={20} />
        </button>
      </form>

      {searchTerm && ( // Render products only when there is a search term
        <div className="max-h-[400px] overflow-y-scroll  pr-2 bg-white rounded-md p-2">
          {filteredProducts.length > 0 ? ( // Render products only if there are filtered products
            filteredProducts.map((product, index) => (
              <div key={index} className="mt-5 mb-6">
                <Link
                  href={{
                    pathname: `/product/${generateSlug(product.name)}`,
                  }}
                  className="text-black hover:text-gray-500 relative"
                >
                  <div className="border gap-2 p-2 pt-3 mb-2 flex items-center rounded-md shadow cursor-pointer hover:border-gray-500 duration-300 transition">
                    <div>
                      {product.posterImageUrl && (
                        <Image
                          src={product.posterImageUrl.imageUrl}
                          width={100}
                          height={100}
                          className="rounded-md"
                          alt="search"
                        />
                      )}
                    </div>
                    <div className="flex gap-3 w-11/12">
                      <div>
                        <HeadingH4 title={product.name} />
                        <Para14
                          className="pl-1"
                          title={truncateText(product.description, 160)}
                        />
                      </div>
                    </div>
                    <div className="hover:text-black mx-auto">
                      <FaArrowRight size={25} />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found</p> // Display message if no products are found
          )}
        </div>
      )}
    </>
  );
};

export default SearchData;
