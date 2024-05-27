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
import { Swiper, SwiperSlide } from 'swiper/react';
import {generateSlug} from 'Data/data'


// Import Swiper styles
import 'swiper/css';

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


  return (
    <Container className='mt-10 md:mt-32'>
        <Swiper
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2.9,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="mySwiper"
      >
        {
          loading ? <div className='flex justify-center items-center w-full'><Loader/></div> 
        : 

        categories && categories.map((category,index) => (
          <SwiperSlide key={index}> 
          <Link  href={{
            pathname: `/products/${generateSlug(category.name)}`,
      
          }} className="keen-slider__slide" >
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
        </SwiperSlide>
        ))}

      </Swiper>

    </Container>
  );
};

export default CategorySlider;

