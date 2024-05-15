"use client"
import CategorySlider from "components/Carousel/Category";
import Product from "components/Home/Product";
import Navbar from "components/layout/Header/Navbar";
import Footer from "components/layout/Footer";
import VideoMain from "components/Common/MainVideo";
import { useEffect, useState } from "react";
import axios from "axios";

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
        setProductsloading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        let slicedProducts = response.data.products && response.data.products.length > 8 ?  response.data.products.slice(0, 8) :  response.data.products
        setProducts(slicedProducts);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally{
        setProductsloading(false)

      }
    };

    const CategoryHandler = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
        );
        const Categories = await response.json();
        setCategory(Categories);
        setLoading(false)
      } catch (err) {
        console.log('err', err)
        setLoading(false)
      }
    };
    CategoryHandler();
    fetchData();
  }, []);
  return (
   <>
   <Navbar/>
   <VideoMain/>
   {/* <MainSlider/> */}
   <CategorySlider
   categories={category}
   loading={loading}/>
   <Product productItems={products} productsLoading={productsLoading}/>
   <Footer/>
   </>
  );
}
