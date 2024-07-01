// //@ts-nocheck
// "use client";
// import { useEffect, useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useSpring,
//   useTransform,
//   useMotionValue,
//   useVelocity,
//   useAnimationFrame,
// } from "framer-motion";
// import { wrap } from "@motionone/utils";
// import Image from "next/image";
// import Link from "next/link";
// import { Para12 } from "components/Common/Paragraph";
// import Container from "components/Common/Container";

// // Function to duplicate the array for a seamless loop
// const createLoopedArray = (arr, count) => {
//   if (!Array.isArray(arr)) {
//     return [];
//   }
//   const loopedArray = [];
//   for (let i = 0; i < count; i++) {
//     loopedArray.push(...arr);
//   }
//   return loopedArray;
// };

// function ParallaxText({ children, baseVelocity = 200, categories, loading }) {
//   const baseX = useMotionValue(0);
//   const { scrollY } = useScroll();
//   const scrollVelocity = useVelocity(scrollY);
//   const smoothVelocity = useSpring(scrollVelocity, {
//     damping: 50,
//     stiffness: 400,
//   });
//   const velocityFactor = useTransform(smoothVelocity, [0, 2000], [0, 5], {
//     clamp: false,
//   });

//   const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

//   const directionFactor = useRef(1);
//   useAnimationFrame((t, delta) => {
//     let moveBy = directionFactor.current * baseVelocity * (delta / 2000);

//     if (velocityFactor.get() < 0) {
//       directionFactor.current = -1;
//     } else if (velocityFactor.get() > 0) {
//       directionFactor.current = 1;
//     }

//     moveBy += directionFactor.current * moveBy * velocityFactor.get();

//     baseX.set(baseX.get() + moveBy);
//   });

//   const loopedCategories = createLoopedArray(categories, 5);

//   return (
//     <Container>
//     <div className="parallax">
//       <motion.div className="scroller" style={{ x }}>
//        {
//           loopedCategories.map((category, index) => (
//             <Link
//               href={{
//                 pathname: `/products/${category._id}`,
//                 query: { Category: JSON.stringify(category) }
//               }}
//               key={index}
//               className="grid place-items-center md:w-[32%] max-w-[30%]"
//             >
//               <div
//                 className={`md:p-0 w-20 h-20 md:w-36 md:h-32 ml-2 mr-2 items-center flex flex-col pb-2 border border-primary100 rounded-lg`}
//               >
//                 <Image
//                   className="py-2 rounded-md w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto"
//                   src={category.posterImageUrl.imageUrl}
//                   alt={category.name}
//                   width={200}
//                   height={200}
//                 />
//                 <Para12 className="poppins-thin text-center" title={category.name} />
//               </div>
//             </Link>
//           ))}
//       </motion.div>
//     </div>
//     </Container>
//   );
// }

// export default function MainSlider({ categories, loading }) {
//   return (
//     <div className={"mt-16 md:mt-32 space-y-3 container-lg"}>
//       <ParallaxText baseVelocity={-5} categories={categories} loading={loading}>Framer Motion</ParallaxText>
//       <ParallaxText baseVelocity={5} categories={categories} loading={loading}>Scroll velocity</ParallaxText>
//     </div>
//   );
// }
