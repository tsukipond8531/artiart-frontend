
const VideoMain = () => {
  return (
    <video
      className="w-full object-cover h-[100%]"
      controls={false}
      loop
      muted
      autoPlay
      playsInline
      preload="none"
    >
      <source src="/assets/images/main.mp4" type="video/mp4" />
    </video>
  );
};
export default VideoMain;
