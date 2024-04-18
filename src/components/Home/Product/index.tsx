import React from 'react';
import ProductCard from '../../Common/ProductCard';
import { HeadingH5 } from '../../Common/Heading';
import Container from '../../Common/Container';
import tra1 from "../../../../public/assets/images/tra1.jpg";
import tra2 from "../../../../public/assets/images/tra2.jpg";
import tra3 from "../../../../public/assets/images/tra3.jpg";
import Button from '../../Common/Button';

const Product = () => {
  return (
    <Container className='mt-10 md:mt-32 '>
      <HeadingH5 title={"Feature"} />
      <ProductCard
        productItems={[
          { image: tra1,image2:tra2, title: "asdas", price: 123, oldPrice: 123 },
          { image: tra2,image2:tra2, title: "asda", price: 12, oldPrice: 123 },
          { image: tra3,image2:tra2, title: "asd", price: 123, oldPrice: 123 },
          { image: tra2,image2:tra2, title: "asd", price: 123, oldPrice: 123 },
          { image: tra1,image2:tra2, title: "asd", price: 123, oldPrice: 123 },
          { image: tra3,image2:tra2, title: "asd", price: 123, oldPrice: 123 },
          { image: tra1,image2:tra2, title: "asd", price: 123, oldPrice: 123 },
        ]}
      />
      <div className='text-center mt-5 mb-5'>
      <Button className='bg-black text-white ' title="View ALL"/>
      </div>
    </Container>
  );
};

export default Product;