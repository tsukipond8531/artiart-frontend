import React from 'react';
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

const Product = () => {
  return (
    <Container className='mt-10 md:mt-32 '>
      <HeadingH5 title={"Feature"} />
      <ProductCard
        productItems={[
          { image: art1,image2:art11, title: "ANTELOPE TRAVEL BOTTLE (GYM, OUTDOORS)", price: 99, link:"/detail" },
          { image: art2,image2:art22, title: " ARTIST TRAVEL BOTTLE (OUTDOORS)", price: 89, oldPrice: 129,link:"/detail" },
          { image: art3,image2:art33, title: " BUTTERFLY BOTTLE  WITH TEA FILTER (GYM, OUTDOORS)", price: 129,link:"/detail" },
          { image: art4,image2:art44, title: "BUTTERFLY BOTTLE  WITH TEA FILTER (GYM, OUTDOORS)", price: 149,link:"/detail" },
          { image: art5,image2:art55, title: "CLOUD BOTTLE WITH INFUSER (GYM, OUTDOORS)", price: 99, oldPrice: 69,link:"/detail" },
          { image: art6,image2:art66, title: "DEER  TRAVEL CUP (OUTDOORS)", price: 89,link:"/detail" },
          { image: art7,image2:art77, title: "DOCTOR SUCTION MUG (OFFICE)", price: 99, oldPrice: 169,link:"/detail" },
          { image: art8,image2:art88, title: "DUMBO TRAVEL MUG (OUTDOORS)", price: 99,link:"/detail" },
        ]}
      />
      <div className='text-center mt-5 mb-5'>
      <Button className='bg-black text-white ' title="View ALL"/>
      </div>
    </Container>
  );
};

export default Product;