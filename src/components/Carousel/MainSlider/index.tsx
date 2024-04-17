"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import tra1 from "../../../../public/assets/images/tra1.jpg";
import tra2 from "../../../../public/assets/images/tra2.jpg";
import tra3 from "../../../../public/assets/images/tra3.jpg";
import { HeadingH5 } from "../../Common/Heading";

const MainSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      id: 1,
      src: tra1,
      title: "UAE",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 2,
      src: tra2,
      title: "Canada",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 3,
      src: tra3,
      title: "Germany",
      description: "Lorem ipsum dolor sit amet...",
    },
    // Add more slides as needed
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      <div className="slider">
        <div className="list">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`item ${index === activeSlide ? "active" : ""}`}
            >
              <Image
                src={slide.src}
                alt={`Slide ${slide.id}`}
                layout="fill"
              />
              <div className="content pt-20 md:pt-10">
                <HeadingH5 className={"text-yellow100"} title={"TRAVELS"} />
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button onClick={prevSlide}>{"<"}</button>
          <button onClick={nextSlide}>{">"}</button>
        </div>
        
      </div>
    </>
  );
};

export default MainSlider;
