"use client"
import ProductCard from '../../Common/ProductCard';
import { HeadingH5 } from '../../Common/Heading';
import Container from '../../Common/Container';
import Button from '../../Common/Button';

const Product = ({ productItems }:any) => {
 
  return (
    <Container className='mt-10 md:mt-32 '>
      <HeadingH5 title={"Feature"} />
      <ProductCard productItems={productItems} />
      <div className='text-center mt-5 mb-5'>
      <Button className='bg-black text-white px-5 ' title="View ALL"/>
      </div>
    </Container>
  );
};

export default Product;