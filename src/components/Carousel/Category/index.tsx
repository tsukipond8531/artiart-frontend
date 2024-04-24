"use client"
import React from 'react';
import Image from 'next/image';
import Container from 'components/Common/Container';
import { HeadingH4 } from 'components/Common/Heading';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { Para14 } from 'components/Common/Paragraph';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategorySliderProps {
  categories: Category[];
}

const CategorySlider: React.FC<CategorySliderProps> = ({ categories }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 400px)': {
        slides: { perView: 2, spacing: 5 },
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
        {categories.map((category) => (
          <Link href={"/products"} className="keen-slider__slide" key={category.id}>
            <div className="space-y-2 flex flex-col items-center">
              <div className="border w-44 h-44 rounded-full">
                <Image
                  className="rounded-full object-contain w-44 h-44"
                  width={150}
                  height={150}
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <Para14 className='poppins-thin' title={category.name} />
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default CategorySlider;

