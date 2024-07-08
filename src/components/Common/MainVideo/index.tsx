
// const VideoMain = () => {
//   return (
//     <video
//       className="w-full object-cover h-[100%]"
//       controls={false}
//       loop
//       muted
//       autoPlay
//       playsInline
//       preload="none"
//     >
//       <source src="/assets/images/main.mp4" type="video/mp4" />
//     </video>
//   );
// };
// export default VideoMain;



import { useEffect, useRef } from 'react';

const VideoMain = () => {
  const videoRef = useRef<any>(null);

  useEffect(() => {

    if(!videoRef.current) return 

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          videoRef.current &&    videoRef.current.load();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full object-cover h-[100%]"
      controls={false}
      loop
      muted
      autoPlay
      playsInline
      preload="none"
    >
      <source src="/assets/images/main.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
export default VideoMain;
