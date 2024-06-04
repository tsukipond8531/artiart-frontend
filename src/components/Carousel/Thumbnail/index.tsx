
// "use client"


// import React, { MutableRefObject } from 'react'
// import {
//   useKeenSlider,
//   KeenSliderPlugin,
//   KeenSliderInstance,
// } from "keen-slider/react"
// import "keen-slider/keen-slider.min.css"
// import Image from 'next/image'

// function ThumbnailPlugin(
//   mainRef: MutableRefObject<KeenSliderInstance | null>
// ): KeenSliderPlugin {
//   return (slider) => {
//     function removeActive() {
//       slider.slides.forEach((slide) => {
//         slide.classList.remove("active")
//       })
//     }
//     function addActive(idx: number) {
//       slider.slides[idx].classList.add("active")
//     }

//     function addClickEvents() {
//       slider.slides.forEach((slide, idx) => {
//         slide.addEventListener("click", () => {
//           if (mainRef.current) mainRef.current.moveToIdx(idx)
//         })
//       })
//     }

//     slider.on("created", () => {
//       if (!mainRef.current) return
//       addActive(slider.track.details.rel)
//       addClickEvents()
//       mainRef.current.on("animationStarted", (main) => {
//         removeActive()
//         const next = main.animator.targetIdx || 0
//         addActive(main.track.absToRel(next))
//         slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
//       })
//     })
//   }
// }

// const Thumbnail = ({ Images }: any) => {
//   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({initial: 0,})

//   const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
//     {
//       initial: 0,
//       slides: {
//         perView: 4,
//         spacing: 10,
//       },
//     },
//     [ThumbnailPlugin(instanceRef)]
//   )
//   return (
//     <>
//       <div ref={sliderRef} className="keen-slider">
//         {
//           Images && Images.map((array: any, index: any) => (
//             <div className="keen-slider__slide w-full h-auto  shadow-md " key={index}>
//               <Image className='w-full object-contain bg-contain rounded-md bg-bottom h-96 ' src={array?.imageUrl} width={1440} height={768} alt='images' />
//             </div>
//           ))}
//       </div>


//       <div ref={thumbnailRef} className="keen-slider thumbnail mt-2 rounded-lg">
//         {
//           Images && Images.map((array: any, index: any) => {
//             return (
//               <div className="keen-slider__slide " key={index}>
//                 <Image className='w-full object-contain md:h-28' src={array?.imageUrl
//                 } width={150} height={150} alt='images' />
//               </div>

//             )
//           })}
//       </div>
//     </>
//   )
// }

// export default Thumbnail

'use client'
import React, { useEffect, useRef, useState } from 'react';
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from 'next/image';

function ThumbnailPlugin(
  mainRef: React.MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Thumbnail = ({ Images, selectedColor }: any) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({ initial: 0 });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );
  const selectImageHandler = () => {
    try {
      if (selectedColor) {

        const index = Images.findIndex((img: any) => {
          if (!img || !img.colorCode) {
            throw new Error("color code not found");

          }

         return  img.colorCode.toLowerCase() === selectedColor.toLowerCase()
        });


        if (index !== -1 && instanceRef.current) {
          instanceRef.current.moveToIdx(index);
        }
      }

    } catch (err) {
      console.log(err, "err")
    }

  }

  useEffect(() => {
    selectImageHandler()
  }, [selectedColor, Images, instanceRef]);


  console.log(Images, "Images")
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {Images && Images.map((array: any, index: any) => (
          <div className="keen-slider__slide w-full h-auto shadow-md" key={index}>
            <Image className='w-full object-contain bg-contain rounded-md bg-bottom h-96' src={array?.imageUrl} width={1440} height={768} alt='images' />
          </div>
        ))}
      </div>
      <div ref={thumbnailRef} className="keen-slider thumbnail mt-2 rounded-lg">
        {Images && Images.map((array: any, index: any) => (
          <div className="keen-slider__slide" key={index}>
            <Image className='w-full object-contain md:h-28' src={array?.imageUrl} width={150} height={150} alt='images' />
          </div>
        ))}
      </div>
    </>
  );
};

export default Thumbnail;


