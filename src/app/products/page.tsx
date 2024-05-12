//@ts-nocheck
"use client"
import React, { useState, useEffect, Suspense } from 'react';

import Container from "components/Common/Container";

import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import Popoverlist from "components/Common/Popover";
import { Para14 } from "components/Common/Paragraph";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import Input from "components/Common/Input";
import Drawerfilter from "components/Common/Drawer";
import { IoFilter } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import ProductCard from "components/Common/ProductCard";
import { useSearchParams } from 'next/navigation'



export default function Products({ params }: { params: any }) {


const [products, setProducts] = useState([]);
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [highestPrice, setHighestPrice] = useState(0);
const [selectedProductCount, setSelectedProductCount] = useState(3);  
const [loading , setLoading] = useState<boolean>(false)
const searchParams = useSearchParams()
const search = searchParams.get('Category')
const parsedCategory = search ? JSON.parse(search) : null;
const id = parsedCategory && parsedCategory._id ? parsedCategory._id : null


useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://artiart-server-phi.vercel.app/api/getAllproducts');
      const products = response.data.products;
      if ((parsedCategory && parsedCategory._id) && (products && products.length > 0)) {
        let filteredArray = products.filter((item) => item.category === parsedCategory._id);
        setProducts(filteredArray);
        setHighestPrice(findHighestPrice(products));
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
    finally{
      setLoading(false)
    }
  };

  fetchData();
}, []);

console.log(params, "params")

const findHighestPrice = (products) => {
  let maxPrice = 0;
  products.forEach((product) => {
    if (product.price > maxPrice) {
      maxPrice = product.price;
    }
  });
  return maxPrice;
};

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const handleResetPrice = () => {
  setMinPrice('');
  setMaxPrice('');
};

const filteredProducts = products.filter(product => {
  if (minPrice && maxPrice) {
    return product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice);
  } else if (minPrice) {
    return product.price >= parseFloat(minPrice);
  } else if (maxPrice) {
    return product.price <= parseFloat(maxPrice);
  }
  return true;
}).slice(0, selectedProductCount);

const handleSelectProductCount = (e) => {
  setSelectedProductCount(parseInt(e.target.value));
};
const totalProducts = products.length;

  return (
    <>

    <Navbar/>
      <Container>

          <h3 className="text-xl font-bold mt-10 mb-20">Artiart</h3>
          <div>
  <div className="hidden md:block">
    <div className="flex justify-between flex-wrap mb-10">
      <div className="flex gap-10 border-sky-2">
        <p>Filter :</p>
        <Popoverlist
          title="Availability"
          content={
            <div className="space-y-3">
              <div className="p-2 flex justify-between items-center border-b-2">
                <Para14 endicon={" selected"} title={"0"} />
                <div className="underline cursor-pointer">Reset</div>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"In stock "} endicon={""}/></Checkbox>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"Out of Stock"} endicon={""}/></Checkbox>
              </div>
            </div>
          }
        />
       <Popoverlist
  title="Price"
  content={
    <div className="space-y-3">
      <div className="p-2 flex justify-between items-center border-b-2">
        <Para14 endicon={`${highestPrice}.00`} title={" The highest price is Dhs. "} />
        <div className="underline cursor-pointer" onClick={handleResetPrice}>Reset</div>
      </div>
      <div className="flex gap-2">
        {/* Update Input components to allow users to enter min and max price */}
        <Input
          type='number'
          name='From'
          placeholder='Enter Minimum Price'
          label='From'
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          type='number'
          name='To'
          placeholder='Enter Maximum Price'
          label='To'
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>
  }
/>

      </div>
      <div className="flex justify-between gap-10">
        <p>Sort by:</p>
        <select value={selectedProductCount} onChange={handleSelectProductCount} className="md:w-28 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
        <div className="">{totalProducts} products</div>
      </div>
    </div>
  </div>
  <div className="md:hidden  mb-4">
    <div className="flex justify-between items-center">
    <Drawerfilter  icon={<IoFilter size={20} />} title="Filter and sort" 
    
     DrawerContent={<>

      <Drawerfilter className=" " title="Availabillity" endicon={<FaArrowRightLong size={20} />} DrawerContent={<>
       <div className="space-y-3">
              <div className="p-2 flex justify-between items-center border-b-2">
                <Para14 endicon={" selected"} title={"0"} />
                <div className="underline cursor-pointer">Reset</div>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"In stock "} endicon={""}/></Checkbox>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"Out of Stock"} endicon={""}/></Checkbox>
              </div>
            </div>
      </>}/>

      <Drawerfilter className="mt-3" title="Price" endicon={<FaArrowRightLong size={20} />} DrawerContent={<>
        <div className="space-y-3">
              <div className="p-2 flex flex-wrap justify-between items-center border-b-2">
              <Para14 endicon={`${highestPrice}.00`} title={" The highest price is Dhs. "} />
              <div className="underline cursor-pointer" onClick={handleResetPrice}>Reset</div>
              </div>
              <div className="flex gap-2">
              {/* Update Input components to allow users to enter min and max price */}
              <Input
                type='number'
                name='From'
                placeholder='Enter Minimum Price'
                label='From'
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input
                type='number'
                name='To'
                placeholder='Enter Maximum Price'
                label='To'
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            </div>
      </>}/>
      <div className="mt-3 flex justify-between">
        <p className="underline text-[18px] ">Sort by:</p>
        <select value={selectedProductCount} onChange={handleSelectProductCount} className="w-24 h-8 block   rounded-lg ring-0 overflow-hidden border-none  disabled:opacity-50 disabled:pointer-events-none">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
      </div>


      </>} />
      <div className="">{totalProducts} products</div>
    </div>
  </div>
</div>
<Suspense fallback={<div>Loading...</div>}>

          <ProductCard productItems={filteredProducts} productsLoading={loading} />
        </Suspense>
      </Container>
      <Footer/>
    </>
  );
}
