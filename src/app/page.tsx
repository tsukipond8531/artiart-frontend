//@ts-nocheck
'use client';
import CategorySlider from 'components/Carousel/Category';
import Product from 'components/Home/Product';
import Navbar from 'components/layout/Header/Navbar';
import Footer from 'components/layout/Footer';
import VideoMain from 'components/Common/MainVideo';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  image: any;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsloading] = useState<boolean>(false);
  const [category, setCategory] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsloading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`,
        );
        let filteredProducts = response.data.products.filter(product => product.totalStockQuantity > 0);
        let slicedProducts =
          filteredProducts.length > 8
            ? filteredProducts.slice(0, 8)
            : filteredProducts;
        setProducts(slicedProducts);
        console.log(slicedProducts , "slicedProducts")
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setProductsloading(false);
      }
    };

    const CategoryHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`,
        );
        const Categories = await response.json();
        setCategory(Categories);
        setLoading(false);
      } catch (err) {
        console.log('err', err);
        setLoading(false);
      }
    };

    CategoryHandler();
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <VideoMain />
      <CategorySlider categories={category} loading={loading} />
      <Product productItems={products} productsLoading={productsLoading} />
      <Footer />
    </>
  );
}
