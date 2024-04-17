import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductItem {
  image: any;
  title: string;
  price: number;
  oldPrice?: number;
}

interface ProductCardProps {
  productItems: ProductItem[];
}

const ProductCard: React.FC<ProductCardProps> = ({ productItems }) => {

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 sm:gap-2 md:gap-5'>
      {productItems.length >0 && productItems.map((array, index) => (
        <div className=" bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mt-5 mb-5" key={index}>
          <Link href="#">
            <Image src={array.image} width={500} height={500} className="h-80 w-full object-cover rounded-t-xl" alt='image' />
            <div className="px-4 py-3 w-full">
              <p className="text-lg font-bold text-black truncate block capitalize">{array.title}</p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">Dhs. <span>{array.price}</span> AED</p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">Dhs. <span>{array.oldPrice}</span> AED</p>
                  </del>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
