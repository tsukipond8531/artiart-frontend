//@ts-nocheck
"use client"
import React, { useState } from "react";
import Thumbnail from "components/Carousel/Thumbnail";
import Container from "components/Common/Container";
import { HeadingH3, HeadingH6 } from "components/Common/Heading";
import { Para12, Para14, Para16 } from "components/Common/Paragraph";
import Link from "next/link";
import { Radio, RadioChangeEvent, message } from "antd";
import { FiMinus, FiPlus } from "react-icons/fi";
import Button from "components/Common/Button";
import DetailTable from "components/Table/DetailTable";

type ButtonOption = {
  value: string;
  label: string;
};

const buttons: ButtonOption[] = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];
const ProductDetail = ({ parsedProduct }: any) => {
  const [count, setCount] = useState<any>(1);
  const initialSelectedValue = parsedProduct && parsedProduct.colors && parsedProduct.colors.length > 0
    ? parsedProduct.colors[0].colorName
    : null;
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);

  const Image: any = parsedProduct?.imageUrl;

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const increment = () => {
    setCount((prevCount: number) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount: number) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  const handleAddToCart = () => {
    if (!selectedValue || !parsedProduct) {
      // Handle error: No color selected or product details missing
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

    // Fetch existing cart items from local storage or initialize an empty array
    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === parsedProduct.id && item.color === selectedValue
    );

    if (existingItemIndex !== -1) {
      // If the product already exists, update its quantity
      existingCart[existingItemIndex].count += count;
    } else {
      // If the product doesn't exist, add it to the cart
      existingCart.push(newCartItem);
    }

    // Update local storage with the updated cart
    localStorage.setItem("cart", JSON.stringify(existingCart));
    message.success('Product added to cart successfully!');
  };
  
  return (
    <>
    {!parsedProduct ? null :  
      <Container className="mt-10 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 ">
          <div className="">
            <Thumbnail Images={Image} />
          </div>
          <div className=" p-2 sm:p-4 md:p-8 max-w-screen-sm mx-0 md:mx-10 lg:mx-20 mt-5 md:mt-0 space-y-3">
            <Para12 title={"ARTIART"} />
            <HeadingH3 title={parsedProduct.name} />
            <div className="flex flex-wrap md:flex-nowrap gap-0 md:gap-3 items-center">
              {parsedProduct.discountPrice ? 
              <Para16
                className="line-through"
    
                title={parsedProduct.price}
                endicon={"  د.إ"}
              /> : null
}
              <Para16  title={parsedProduct.price} endicon={" د.إ"} />
              <div className="border rounded-xl bg-blue-600 px-3 py-1 text-white">
                Sale
              </div>
            </div>
            <p className="text-[12px]">
              Tax included.{" "}
              <Link className="underline" href={"policy"}>
                Shipping
              </Link>{" "}
              calculated at checkout.
            </p>
            <Para14 title={"Color"} />
            <div className="flex gap-2 mb-4">
              {parsedProduct.colors && parsedProduct.colors.map((button:any, index:any) => (
            //     <Radio
            //     key={index}
            //     value={button.colorName}
            //     checked={selectedValue === button.value}
            //     onChange={handleChange}
            //     className={`${
            //         selectedValue === button.colorName
            //         ? "bg-blue-600 text-white"
            //         : `bg-${button.colorName} text-blue-600 border border-blue-600`
            //     } py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-100 cursor-pointer`}
            // >
            //     {button.colorName}
            // </Radio>

            <Radio
            key={index}
            value={button.colorName}
            checked={selectedValue === button.colorName} // Compare with button.colorName instead of button.value
            onChange={handleChange}
            className={`py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-100 cursor-pointer ${
                selectedValue === button.colorName // Compare with button.colorName
                ? `bg-blue-100 text-black`
                : `bg-${button.colorName}-500 text-black border border-${button.colorName}-600`
            }`}

            style={{backgroundColor: selectedValue === button.colorName ? "#c8d9ed" : button.colorName}}
        >
          
            {button.colorName.charAt(0).toUpperCase() + button.colorName.slice(1)}
        </Radio>
        
              ))}
            </div>
            <Para14 title={"Quantity"} />
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
            <Button className="border w-full rounded-none border-black hover:border-2"  onClick={handleAddToCart} title={"Add to Cart"} />

            <Button className={"bg-black w-full  rounded-none text-white"}  title={"Buy it now"} />

            <div className="p-2 space-y-4">
            <ul className="list-disc">
              {
                parsedProduct.spacification && parsedProduct.spacification.map((array:any,index:any)=>(
                  <li key={index}>{array.specsDetails}</li>
                ))
              }
            </ul>
            <Para14 title={parsedProduct.description && parsedProduct.description}/>
            {
              parsedProduct.modelDetails ? 
              <DetailTable
              keypoint={
                parsedProduct.modelDetails
            }
              />
            : null}
            
            </div>
        
          </div>
  
        </div>
        {/* <HeadingH3 title={"You may also like"}/> */}
         
      </Container>
}
    </>
  );
};

export default ProductDetail;
