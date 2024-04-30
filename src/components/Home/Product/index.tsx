"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from '../../Common/ProductCard';
import { HeadingH5 } from '../../Common/Heading';
import Container from '../../Common/Container';

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