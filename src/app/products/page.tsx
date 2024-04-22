"use client"

import ProductCard from "components/ProductCard/ProductCard";
import Image from '../../../public/assets/images/waterBottle.png'

const products: any[] = [
  {
    ImgUrl: Image,
    title: "Product 1",
    strikThroughPrice: "$100",
    price: "$80"
  },
  {
    ImgUrl: Image,
    title: "Product 2",

    price: "$100"
  },
  {
    ImgUrl: Image,
    title: "Product 3",
    strikThroughPrice: "$90",
    price: "$70"
  },
  {
    ImgUrl: Image,
    title: "Product 3",
    strikThroughPrice: "$90",
    price: "$70"
  },

  {
    ImgUrl: Image,
    title: "Product 1",
    strikThroughPrice: "$100",
    price: "$80"
  },
  {
    ImgUrl: Image,
    title: "Product 2",
    strikThroughPrice: "$120",
    price: "$100"
  },
  {
    ImgUrl: Image,
    title: "Product 3",
    strikThroughPrice: "$90",
    price: "$70"
  },
  {
    ImgUrl: Image,
    title: "Product 3",
    strikThroughPrice: "$90",
    price: "$70"
  }
];


export default function Products() {
  return (
    <>
      <div className="w-full h-full">

        <div className="w-[92%] m-auto">
          <h3 className="text-xl font-bold mt-10 mb-20">Artiart</h3>
          {/* filter container */}
          <div className="flex justify-between flex-wrap mb-10" >
            <div className="flex gap-10 border-sky-2"  >
              <p>Filter : </p>
              <div>Availability </div>
              <div>Price </div>
            </div>


            <div className="flex justify-end gap-10" >     <p>Sort by:</p>
              <div>Best Selling </div>
              <div className="">20 products </div></div>

          </div>

          {/* Cards */}

          <div className="flex  mb-4 gap-5 flex-wrap">
            {products.map((item: any, index: number) => (
              <div key={index} className="w-[20%] flex-grow ">
                <ProductCard
                  ImgUrl={item.ImgUrl}
                  title={item.title}
                  strikThroughPrice={item.strikThroughPrice}
                  price={item.price}
                />
              </div>
            ))}
          </div>


        </div>



      </div>
    </>
  );
}
