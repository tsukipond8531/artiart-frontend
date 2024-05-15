'use client'
import ProductDetail from "components/Detail/ProductDetail";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import React from "react";
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useEffect, useState } from "react";
import axios from 'axios'
import Product from "components/Home/Product";





const Detail = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('product')
  const parsedProduct = search ? JSON.parse(search) : null;
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsloading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        if(parsedProduct._id){
          let slicedProducts = response.data.products && response.data.products.length > 4 ?  response.data.products.filter((item:any)=>item._id !==parsedProduct._id).slice(0, 4) :   response.data.products.filter((item:any)=>item._id !==parsedProduct._id)
          console.log(slicedProducts, "slicedProducts")
          setProducts(slicedProducts);

        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally{
        setProductsloading(false)
  
      }
    };
  
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <ProductDetail parsedProduct={parsedProduct} />

<div>
  <Product productItems={products} productsLoading={productsLoading} HeadingName="You may also like"/>


</div>
      <Footer />
    </>
  );
};

export default Detail;
