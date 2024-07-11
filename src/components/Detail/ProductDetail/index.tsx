// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import Thumbnail from 'components/Carousel/Thumbnail';
import Container from 'components/Common/Container';
import { HeadingH3, HeadingH6 } from 'components/Common/Heading';
import { Para12, Para14, Para16 } from 'components/Common/Paragraph';
import Link from 'next/link';
import { Radio, RadioChangeEvent, message } from 'antd';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Button from 'components/Common/Button';
import DetailTable from 'components/Table/DetailTable';
import { FaFacebookF } from 'react-icons/fa6';
import Checkout from 'app/checkout/page';
import DetailTabs from 'components/Tabs';
import Review from '../Review';
import axios from 'axios';

const ProductDetail = ({ parsedProduct }: any) => {
  const [count, setCount] = useState(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [parsedProduct._id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${parsedProduct._id}`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.error(err.message);
    }
  };

  const findColorWithStock = () => {
    const colorWithStock = parsedProduct.colors.find((color) => {
      const stock =
        parsedProduct.variantStockQuantities?.find(
          (v) => v.variant === color.colorName,
        )?.quantity || 0;
      return stock > 0;
    });
    return colorWithStock ? colorWithStock.colorName : null;
  };

  const initialSelectedValue =
    parsedProduct && parsedProduct.colors && parsedProduct.colors.length > 0
      ? findColorWithStock()
      : null;
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);
  const [selectedStock, setSelectedStock] = useState(
    parsedProduct.variantStockQuantities?.find(
      (v) => v.variant === initialSelectedValue,
    )?.quantity || 0,
  );

  useEffect(() => {
    const initialStock =
      parsedProduct.variantStockQuantities?.find(
        (v) => v.variant === initialSelectedValue,
      )?.quantity || 0;
    setSelectedStock(initialStock);
  }, [parsedProduct, initialSelectedValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    const stock =
      parsedProduct.variantStockQuantities?.find((v) => v.variant === newValue)
        ?.quantity || 0;
    setSelectedStock(stock);
  };

  const increment = () => {
    setCount((prevCount) =>
      prevCount < selectedStock ? prevCount + 1 : prevCount,
    );
    window.dispatchEvent(new Event('cartChanged'));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
    window.dispatchEvent(new Event('cartChanged'));
  };

  const handleAddToCart = () => {
    if (!selectedValue || !parsedProduct) {
      return;
    }

    const newCartItem = {
      id: parsedProduct.id,
      name: parsedProduct.name,
      price: parsedProduct.price,
      imageUrl: parsedProduct.imageUrl,
      color: selectedValue,
      count: count,
      totalPrice: parsedProduct.price * count,
    };

    let existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === parsedProduct.id && item.color === selectedValue,
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].count += count;
      existingCart[existingItemIndex].totalPrice =
        existingCart[existingItemIndex].count * parsedProduct.price;
    } else {
      existingCart.push(newCartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    message.success('Product added to cart successfully!');
    window.dispatchEvent(new Event('cartChanged'));
  };

  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="p-2 flex flex-wrap md:flex-nowrap md:gap-10">
          <div className="w-full md:w-4/6 border-r-2">
            <Para14 title={parsedProduct.description} />
          </div>
          <ul className="list-disc w-full md:w-2/6">
            {parsedProduct.spacification?.map((spec, index) => (
              <li key={index}>{spec.specsDetails}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: 'Additional Information',
      content: parsedProduct.modelDetails ? <DetailTable keypoint={parsedProduct.modelDetails} /> : null,
    },
    {
      label: 'Reviews',
      content: <Review reviews={reviews} productId={parsedProduct._id} fetchReviews={fetchReviews} />,
    },
  ];

  

  return (
    <>
      {!parsedProduct ? null : (
        <Container className="mt-10 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
            <div className="">
              <Thumbnail
                Images={parsedProduct.imageUrl}
                selectedColor={selectedValue}
              />
            </div>

            <div className=" p-2 sm:p-4 md:p-8 max-w-screen-sm mx-0 md:mx-10 lg:mx-20 mt-5 md:mt-0 space-y-3">
              <Para12 title={'ARTIART'} />
              <HeadingH3 title={parsedProduct.name} />
              <div className="flex flex-wrap md:flex-nowrap gap-0 md:gap-3 items-center">
                {parsedProduct.discountPrice ? (
                  <Para16
                    className="line-through"
                    title={parsedProduct.price}
                    endicon={'  AED'}
                  />
                ) : null}
                <p className={`text-16 gap-2`}>
                  AED{' '}
                  {parsedProduct.discountPrice
                    ? parsedProduct.discountPrice
                    : parsedProduct.price}
                  .00{' '}
                </p>
              </div>
              <p className="text-[12px]">
                Tax included.{' '}
                <Link className="underline" href={'/shipping-policy'}>
                  Shipping
                </Link>{' '}
                calculated at checkout.
              </p>
              {selectedStock === 0 ? (
                <p>
                  <span className="font-semibold text-lg">Out of Stock: </span>{' '}
                  {selectedStock ?? '0'}{' '}
                </p>
              ) : (
                <p>
                  <span className="font-semibold text-lg">In Stock: </span>{' '}
                  {selectedStock ?? '0'}{' '}
                </p>
              )}
              <p className="font-semibold text-lg">Color </p>
              <div className="flex gap-2 mb-4 flex-wrap w-full">
                {parsedProduct.colors &&
                  parsedProduct.colors.map((button, index) => {
                    return (
                      <p
                        key={index}
                        className={`py-2 px-4 w-[45px] h-[40px] rounded-lg focus:outline-none whitespace-nowrap hover:bg-blue-100 cursor-pointer ${
                          selectedValue === button.colorName
                            ? `bg-blue-100 border-2 border-blue-500`
                            : `bg-${button.colorName}-500  ${button.colorName.toLowerCase() == 'black' || button.colorName.toLowerCase() == '#000' ? 'text-white' : 'text-black'} border border-${button.colorName}-600`
                        }`}
                        style={{ backgroundColor: `#${button.colorName}` }}
                        onClick={() =>
                          handleChange({ target: { value: button.colorName } })
                        }
                      />
                    );
                  })}
              </div>
              {selectedStock === 0 ? (
                <>
                  <p className="font-semibold">
                    Follow Our Social Media for latest Updates
                  </p>
                  <div className="flex space-x-4 ">
                    <Link
                      href="https://www.facebook.com/artiartuae"
                      target="_blank"
                      className="w-9 h-9 rounded-full bg-white shadow  flex justify-center items-center hover:shadow-md"
                    >
                      <FaFacebookF size={18} className="text-blue-600" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/artiartuae/"
                      target="_blank"
                      className="w-9 h-9 rounded-full bg-white  flex justify-center items-center shadow hover:shadow-md"
                    >
                      <svg
                        className="w-[1.25rem] h-[1.125rem]"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.20975 7.81944C5.20975 6.54106 6.26102 5.50444 7.5582 5.50444C8.85537 5.50444 9.90721 6.54106 9.90721 7.81944C9.90721 9.09783 8.85537 10.1344 7.5582 10.1344C6.26102 10.1344 5.20975 9.09783 5.20975 7.81944ZM3.93991 7.81944C3.93991 9.78889 5.55982 11.3853 7.5582 11.3853C9.55658 11.3853 11.1765 9.78889 11.1765 7.81944C11.1765 5.85 9.55658 4.25356 7.5582 4.25356C5.55982 4.25356 3.93991 5.85 3.93991 7.81944ZM10.4741 4.11217C10.4741 4.27698 10.5236 4.43812 10.6165 4.5752C10.7093 4.71228 10.8413 4.81914 10.9958 4.88227C11.1503 4.94541 11.3203 4.96198 11.4844 4.92989C11.6484 4.8978 11.7991 4.81849 11.9174 4.70199C12.0357 4.58549 12.1163 4.43704 12.149 4.2754C12.1817 4.11376 12.165 3.9462 12.1011 3.79391C12.0371 3.64161 11.9288 3.51142 11.7898 3.41979C11.6508 3.32817 11.4873 3.27923 11.3201 3.27917H11.3197C11.0955 3.27927 10.8806 3.36705 10.722 3.52324C10.5635 3.67943 10.4743 3.89124 10.4741 4.11217ZM4.71142 13.4721C4.02442 13.4412 3.65101 13.3284 3.40286 13.2332C3.07387 13.1069 2.83914 12.9566 2.59235 12.7137C2.34555 12.4708 2.19278 12.2397 2.06527 11.9155C1.96854 11.6711 1.8541 11.3029 1.82287 10.6259C1.78871 9.89389 1.78189 9.674 1.78189 7.8195C1.78189 5.965 1.78927 5.74572 1.82287 5.01311C1.85416 4.33606 1.96944 3.96867 2.06527 3.7235C2.19335 3.39928 2.34589 3.16794 2.59235 2.92472C2.8388 2.6815 3.07331 2.53094 3.40286 2.40528C3.6509 2.30994 4.02442 2.19717 4.71142 2.16639C5.45417 2.13272 5.67729 2.126 7.5582 2.126C9.4391 2.126 9.66244 2.13328 10.4058 2.16639C11.0928 2.19722 11.4656 2.31083 11.7144 2.40528C12.0434 2.53094 12.2781 2.68183 12.5249 2.92472C12.7717 3.16761 12.9239 3.39928 13.052 3.7235C13.1487 3.96794 13.2631 4.33606 13.2944 5.01311C13.3285 5.74572 13.3354 5.965 13.3354 7.8195C13.3354 9.674 13.3285 9.89328 13.2944 10.6259C13.2631 11.3029 13.1481 11.6709 13.052 11.9155C12.9239 12.2397 12.7714 12.4711 12.5249 12.7137C12.2784 12.9564 12.0434 13.1069 11.7144 13.2332C11.4663 13.3285 11.0928 13.4413 10.4058 13.4721C9.66306 13.5057 9.43994 13.5124 7.5582 13.5124C5.67645 13.5124 5.45395 13.5057 4.71142 13.4721ZM4.65307 0.917056C3.90294 0.950722 3.39035 1.06794 2.9427 1.23961C2.4791 1.41689 2.08663 1.65472 1.69446 2.04061C1.30228 2.4265 1.06157 2.81389 0.881687 3.27078C0.707498 3.71222 0.588554 4.21711 0.554392 4.95639C0.519667 5.69683 0.511719 5.93356 0.511719 7.81944C0.511719 9.70533 0.519667 9.94206 0.554392 10.6825C0.588554 11.4218 0.707498 11.9267 0.881687 12.3681C1.06157 12.8247 1.30233 13.2126 1.69446 13.5983C2.08658 13.984 2.4791 14.2215 2.9427 14.3993C3.39119 14.5709 3.90294 14.6882 4.65307 14.7218C5.40479 14.7555 5.6446 14.7639 7.5582 14.7639C9.4718 14.7639 9.712 14.7561 10.4633 14.7218C11.2135 14.6882 11.7258 14.5709 12.1737 14.3993C12.637 14.2215 13.0298 13.9842 13.4219 13.5983C13.8141 13.2124 14.0543 12.8247 14.2347 12.3681C14.4089 11.9267 14.5284 11.4218 14.562 10.6825C14.5962 9.9415 14.6041 9.70533 14.6041 7.81944C14.6041 5.93356 14.5962 5.69683 14.562 4.95639C14.5278 4.21706 14.4089 3.71194 14.2347 3.27078C14.0543 2.81417 13.8135 2.42711 13.4219 2.04061C13.0304 1.65411 12.637 1.41689 12.1743 1.23961C11.7258 1.06794 11.2135 0.950167 10.4639 0.917056C9.71256 0.883389 9.47236 0.875 7.55876 0.875C5.64516 0.875 5.40479 0.882833 4.65307 0.917056Z"
                          fill="url(#paint0_linear_9147_17049)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_9147_17049"
                            x1="14.6041"
                            y1="1.67072"
                            x2="0.399812"
                            y2="14.3286"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#7C3AED" />
                            <stop offset="0.993738" stopColor="#4F46E5" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Para14 title={'Quantity'} />
                  <div className="border-2 p-2 flex justify-center items-center gap-2 w-28">
                    <FiMinus
                      className="cursor-pointer"
                      size={20}
                      onClick={decrement}
                    />
                    <input
                      className="w-14 text-center hover:border hover:scale-105"
                      type="text"
                      value={count}
                      readOnly
                    />
                    <FiPlus
                      className="cursor-pointer"
                      size={20}
                      onClick={increment}
                    />
                  </div>
                  <Button
                    className="border w-full rounded-none border-black hover:bg-slate-100"
                    onClick={handleAddToCart}
                    title={'Add to Cart'}
                  />
                  <Link
                    href={{
                      pathname: '/checkout',
                      query: {
                        subtotal: (parsedProduct.discountPrice
                          ? parsedProduct.discountPrice
                          : parsedProduct.price
                        ).toString(),
                      },
                    }}
                  >
                    <Button
                      className={
                        'bg-black w-full mt-2 rounded-none text-white hover:bg-slate-900'
                      }
                      title={'Buy It Now'}
                    />
                  </Link>
                </>
              )}

            </div>
          </div>
            <DetailTabs tabs={tabs} />
        </Container>
      )}
    </>
  );
};

export default ProductDetail;
