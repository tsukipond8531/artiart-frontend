"use client"
import React from 'react';
import Image from 'next/image';
import Container from 'components/Common/Container';
import { HeadingH4 } from 'components/Common/Heading';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { Para12, Para14 } from 'components/Common/Paragraph';
import Loader from "components/Loader/Loader";


interface Category {
  _id: number;
  name: string;
  posterImageUrl: any;
  createdAt:any
  updatedAt:any

}

interface CategorySliderProps {
  categories: Category[] | undefined;
  loading:boolean
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories,loading }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 320px)': {
        slides: { perView: 2.3, spacing: 5 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 5, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  

  return (
    <Container className='mt-10 md:mt-32'>
      <div ref={sliderRef} className="keen-slider">

        {
        loading ? <div className='flex justify-center items-center w-full'><Loader/></div> 
        : 

        categories && categories.map((category) => (
          <Link  href={{
            pathname: `/products/${category._id}`,
            query: { Category: JSON.stringify(category) }
          }} className="keen-slider__slide" key={category._id}>
            <div className="space-y-2 flex flex-col items-center">
              <div className="border object-contain w-20 h-20 md:w-44 md:h-44 rounded-full">
                <Image
                  className="rounded-full bg-contain w-20 h-20 md:w-44 md:h-44"
                  width={150}
                  height={150}
                  src={category.posterImageUrl.imageUrl}
                  alt={category.name}
                />
              </div>
              <Para12 className='poppins-thin text-center' title={category.name} />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default CategorySlider;

