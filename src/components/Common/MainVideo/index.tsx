import React from 'react'

const VideoMain = () => {
  return (
<video width="320" height="240" controls autoPlay preload="none">
      <source src='/assets/images/main.mp4' type="video/mp4" />
    
    </video>
  )
}

export default VideoMain