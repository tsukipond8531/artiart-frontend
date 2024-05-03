'use client'
import ProductDetail from "components/Detail/ProductDetail";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import React from "react";
import { useSearchParams } from 'next/navigation'

const Detail = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('product')
  const parsedProduct = search ? JSON.parse(search) : null;


  console.log(parsedProduct, "parsedProduct")

  return (
    <>
      <Navbar />
      <ProductDetail parsedProduct={parsedProduct} />
      <Footer />
    </>
  );
};

export default Detail;
