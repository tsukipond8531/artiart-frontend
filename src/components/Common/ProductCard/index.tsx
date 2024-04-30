import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductItem {
  imageUrl: { imageUrl: string; public_id: string }[];
  hoverImageUrl: { imageUrl: string; public_id: string };
  posterImageUrl: { imageUrl: string; public_id: string };
  name: string;
  price: number;
  discountPrice?: number;
  _id?: any;
}

interface ProductCardProps {
  productItems: ProductItem[];
}

const generateSlug = (name: string): string => {
  if (!name) return ''; // Check if name is undefined or null
  return name
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens
};

const ProductCard: React.FC<ProductCardProps> = ({ productItems }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2 md:gap-5'>
      {productItems.length > 0 && productItems.map((product, index) => (
        <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mt-5 mb-5 group" key={index}>
         <Link
          // href={`/detail/${generateSlug(product.name)}-${product._id}`}
          href={{
            pathname: `/detail/${generateSlug(product.name)}-${product._id}`,
            query: { product: JSON.stringify(product) }
          }}
          
          >
            <div className='relative overflow-hidden rounded-t-xl'>
              {product.posterImageUrl && (
                <Image src={product.posterImageUrl.imageUrl} width={500} height={500} className="h-20 md:h-80 w-full object-contain rounded-t-xl" alt='image' />
              )}
              {product.hoverImageUrl && (
                <Image src={product.hoverImageUrl.imageUrl} width={500} height={500} className="h-20 md:h-80 w-full object-contain rounded-t-xl absolute top-0 opacity-0 group-hover:opacity-100 transition-all duration-500" alt='image' />
              )}
            </div>
            <div className="px-4 py-3 w-full">
              <p className="text-[14px] poppins-thin text-black truncate block capitalize">{product.name}</p>
              <div className="flex items-center flex-wrap justify-between">
                <p className="text-[14px] poppins-thin text-black cursor-auto my-3">Dhs. <span>{product.price}</span> AED</p>
                {product.discountPrice ? (
                  <del className=''>
                    <p className="text-sm text-gray-600 cursor-auto ">Dhs. <span>{product.discountPrice}</span> AED</p>
                  </del>
                ) : null}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
