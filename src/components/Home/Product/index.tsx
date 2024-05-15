"use client"
import ProductCard from '../../Common/ProductCard';
import { HeadingH5 } from '../../Common/Heading';
import Container from '../../Common/Container';
import Button from '../../Common/Button';
import { useRouter } from 'next/navigation';
 interface PROPS{
  productItems:any,
  productsLoading:boolean,
  HeadingName?:string | undefined | null
 }


const Product = ({ productItems, productsLoading, HeadingName }:PROPS) => {
  const router = useRouter()
 
  return (
    <Container className='mt-10 md:mt-32 '>
      <HeadingH5 title={HeadingName ? HeadingName : "Feature"} />
      <ProductCard productItems={productItems} productsLoading={productsLoading} />
      <div className='text-center mt-5 mb-5'>
      <Button className='bg-black text-white px-5 ' title="View ALL" onClick={()=>router.push('/products')}/>
      </div>
    </Container>
  );
};

export default Product;