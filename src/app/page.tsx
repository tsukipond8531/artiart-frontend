"use client"
import CategorySlider from "components/Carousel/Category";
import MainSlider from "components/Carousel/MainSlider";
import Product from "components/Home/Product";
import tra1 from "../../public/assets/images/art/art1.png"
import tra2 from "../../public/assets/images/art/art2.png"
import tra3 from "../../public/assets/images/art/art3.png"
import tra4 from "../../public/assets/images/art/art4.png"
import tra5 from "../../public/assets/images/art/art5.png"
import tra6 from "../../public/assets/images/art/art6.png"
import tra7 from "../../public/assets/images/art/art7.png"
import tra8 from "../../public/assets/images/art/art8.png"
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
  const categories: Category[] = [
    { id: 1, name: 'Suction Mugs', image: tra1 },
    { id: 2, name: 'Suction Bottles', image: tra2 },
    { id: 1, name: 'Insulated Suction Flasks', image: tra3 },
    { id: 2, name: 'Insulated Suction Mugs', image: tra4 },
    { id: 1, name: 'Suction Mugs', image: tra5 },
    { id: 2, name: 'Suction Bottles', image: tra6 },
    { id: 1, name: 'Insulated Suction Flasks', image: tra7 },
    { id: 2, name: 'Insulated Suction Mugs', image: tra8 },

  ];
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsloading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        setProducts(response.data.products);
        console.log('Product Data:', response.data.products);
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

   <Navbar/>
   <VideoMain/>
   {/* <MainSlider/> */}
   <CategorySlider
   categories={categories}
   />
   <Product productItems={products} productsLoading={productsLoading}/>
   <Footer/>
   </>
  );
}
