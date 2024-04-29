"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from '../../Common/ProductCard';
import { HeadingH5 } from '../../Common/Heading';
import Container from '../../Common/Container';
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

import Button from '../../Common/Button';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://artiart-server-phi.vercel.app/api/getAllproducts');
        setProducts(response.data.products);
        console.log('Product Data:', response.data.products);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container className='mt-10 md:mt-32 '>
      <HeadingH5 title={"Feature"} />
      <ProductCard productItems={products} />
      <div className='text-center mt-5 mb-5'>
      <Button className='bg-black text-white px-5 ' title="View ALL"/>
      </div>
    </Container>
  );
};

export default Product;