'use client'
import ProductDetail from "components/Detail/ProductDetail";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import React from "react";
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'


const Detail = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('product')
  const parsedProduct = search ? JSON.parse(search) : null;

  return (
    <>
      <Navbar />
      <Suspense>
      <ProductDetail parsedProduct={parsedProduct} />
      </Suspense>
      <Footer />
    </>
  );
};

export default Detail;
