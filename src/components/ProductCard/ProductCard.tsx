'use client';
import React from 'react';
import Image from 'next/image';
import { PRODUCTCARDPROPS } from 'types/interfaces';

export default function ProductCard({
  ImgUrl,
  title,
  strikThroughPrice,
  price,
}: PRODUCTCARDPROPS) {
  return (
    <div className="group flex flex-col gap-1">
      <div>
        {' '}
        <Image
          src={ImgUrl}
          alt="Card array"
          width={250}
          height={250}
          className="transition-transform duration-300 transform group-hover:scale-105"
        />{' '}
      </div>
      <p className="uppercase text-xl font-bold text-gray-800 ">{title}</p>
      <div className="flex gap-2">
        <p className="line-through">{strikThroughPrice}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}
