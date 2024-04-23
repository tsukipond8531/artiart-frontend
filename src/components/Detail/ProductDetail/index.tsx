"use client";
import React, { useState } from "react";
import Thumbnail from "components/Carousel/Thumbnail";
import Container from "components/Common/Container";
import { HeadingH3, HeadingH6 } from "components/Common/Heading";
import { Para12, Para14, Para16 } from "components/Common/Paragraph";
import Link from "next/link";
import { Radio, RadioChangeEvent } from "antd";
import { FiMinus, FiPlus } from "react-icons/fi";
import Button from "components/Common/Button";
import { list } from "components/Constant";
import DetailTable from "components/Table/DetailTable";

import art1 from "../../../../public/assets/images/art/art1.png";
import art11 from "../../../../public/assets/images/art/art11.jpg";
import art2 from "../../../../public/assets/images/art/art2.png";
import art22 from "../../../../public/assets/images/art/art22.jpg";
import art3 from "../../../../public/assets/images/art/art3.png";
import art33 from "../../../../public/assets/images/art/art33.webp";
import art4 from "../../../../public/assets/images/art/art4.png";
import art44 from "../../../../public/assets/images/art/art44.jpg";
import art5 from "../../../../public/assets/images/art/art5.png";
import art55 from "../../../../public/assets/images/art/art55.jpg";
import art6 from "../../../../public/assets/images/art/art6.png";
import art66 from "../../../../public/assets/images/art/art66.jpg";
import art7 from "../../../../public/assets/images/art/art7.png";
import art77 from "../../../../public/assets/images/art/art77.jpg";
import art8 from "../../../../public/assets/images/art/art8.png";
import art88 from "../../../../public/assets/images/art/art88.jpg";
import ProductCard from "components/Common/ProductCard";

type ButtonOption = {
  value: string;
  label: string;
};

const buttons: ButtonOption[] = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

const ProductDetail: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (e: RadioChangeEvent) => {
    setSelectedValue(e.target.value);
  };

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => {
      if (prevCount > 1) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  return (
    <>
      <Container className="mt-10 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 ">
          <div className="">
            <Thumbnail />
          </div>
          <div className=" p-2 sm:p-4 md:p-8 max-w-screen-sm mx-0 md:mx-10 lg:mx-20 mt-5 md:mt-0 space-y-3">
            <Para12 title={"ARTIART INDIA"} />
            <HeadingH3 title={"ANTELOPE TRAVEL BOTTLE (GYM, OUTDOORS)"} />
            <div className="flex flex-wrap md:flex-nowrap gap-0 md:gap-3 items-center">
              <Para16
                className="line-through"
                icon={"Dhs.  "}
                title={"129.00"}
                endicon={"  AED"}
              />
              <Para16 icon={"Dhs.  "} title={"100.00"} endicon={"  AED"} />
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
              {buttons.map((button) => (
                <Radio
                  key={button.value}
                  value={button.value}
                  checked={selectedValue === button.value}
                  onChange={handleChange}
                  className={`${
                    selectedValue === button.value
                      ? "bg-blue-600 text-white" // Tailwind classes for selected radio button
                      : "bg-white text-blue-600 border border-blue-600"
                  } py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-100 cursor-pointer`} // Styling for buttons
                >
                  {button.label}
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
            <Button className="border w-full rounded-none border-black hover:border-2" title={"Add to Cart"} />
            <Button className={"bg-black w-full  rounded-none text-white"} title={"Buy it now"} />
            <div className="p-2 space-y-4">
            <ul className="list-disc">
              {
                list.map((array,index)=>(
                  <li key={index}>{array.detail}</li>
                ))
              }
            </ul>
            <Para14 title={"The round finished scratch resistant surface offers an easy, one-handed drinking experience. The broad rubberized grip forming the rim adds to the premium appeal of the mug. The wide mouth of the mug facilitates cleaning the interior with ease which makes its durable and sturdy design is perfect for daily use."}/>
            <DetailTable
            keypoint={[
              {name:"Model Name:	", detail: "Zebra Suction Mug"},
              {name:"Product Code	", detail: "DRIN117"},
              {name:"PRODUCT DIMENSIONS:", detail: "162 * 77* 77 mm"},
              {name:"Material", detail: "	PP . TPR . Silicon"},
              {name:"Feature", detail: "	No Spill Suction Mug"},
            ]}
            />
            </div>
        
          </div>
  
        </div>
        <HeadingH3 title={"You may also like"}/>
          <ProductCard
        productItems={[
          { image: art1,image2:art11, title: "ANTELOPE TRAVEL BOTTLE (GYM, OUTDOORS)", price: 99, link:"/detail" },
          { image: art2,image2:art22, title: " ARTIST TRAVEL BOTTLE (OUTDOORS)", price: 89, oldPrice: 129,link:"/detail" },
          { image: art3,image2:art33, title: " BUTTERFLY BOTTLE  WITH TEA FILTER (GYM, OUTDOORS)", price: 129,link:"/detail" },
          { image: art4,image2:art44, title: "BUTTERFLY BOTTLE  WITH TEA FILTER (GYM, OUTDOORS)", price: 149,link:"/detail" },
          { image: art5,image2:art55, title: "CLOUD BOTTLE WITH INFUSER (GYM, OUTDOORS)", price: 99, oldPrice: 69,link:"/detail" },
          { image: art6,image2:art66, title: "DEER  TRAVEL CUP (OUTDOORS)", price: 89,link:"/detail" },
          { image: art7,image2:art77, title: "DOCTOR SUCTION MUG (OFFICE)", price: 99, oldPrice: 169,link:"/detail" },
          { image: art8,image2:art88, title: "DUMBO TRAVEL MUG (OUTDOORS)", price: 99,link:"/detail" },
        ]}
      />
      </Container>
    </>
  );
};

export default ProductDetail;
