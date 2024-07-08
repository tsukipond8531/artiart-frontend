import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loader from 'components/Loader/Loader';
import { generateSlug } from 'Data/data';
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
  productsLoading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productItems,
  productsLoading,
}) => {
  return (
    <>
      {productsLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2 md:gap-5">
          {productItems.length > 0 &&
            productItems.map((product, index) => (
              <div
                className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl mt-5 mb-5 group"
                key={index}
              >
                <Link
                  href={{
                    pathname: `/product/${generateSlug(product.name)}`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    {product.posterImageUrl && (
                      <Image
                        src={product.posterImageUrl.imageUrl}
                        width={500}
                        height={500}
                        className="h-20 md:h-80 w-full object-contain rounded-t-xl"
                        alt="image"
                      />
                    )}
                    {product.hoverImageUrl && (
                      <Image
                        src={product.hoverImageUrl.imageUrl}
                        width={500}
                        height={500}
                        className="h-20 md:h-80 w-full object-contain rounded-t-xl absolute top-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        alt="image"
                      />
                    )}
                  </div>
                  <div className="px-4 py-3 w-full">
                    <p className="text-12 poppins-thin break-all overflow-wrap-break-word text-black block capitalize">
                      {product.name}
                    </p>

                    {/* <p className="text-[17px] poppins-thin break-all text-black truncate block capitalize">{product.name}</p> */}
                    <div className="flex items-center flex-wrap justify-between">
                      <p className="text-[15px] poppins-thin text-black cursor-auto my-3">
                        AED <span>{product.price}</span>.00
                      </p>
                      {product.discountPrice ? (
                        <del className="">
                          <p className="text-[15px] text-gray-600 cursor-auto font-i">
                            {' '}
                            <span className="text-lg">
                              AED {product.discountPrice}
                            </span>{' '}
                          </p>
                        </del>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ProductCard;
