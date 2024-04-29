import React from 'react'

const VideoMain = () => {
  return (
<video className='w-full' controls={false} loop muted  autoPlay >
      <source src='/assets/images/main.mp4' type="video/mp4" />
    
    </video>
  )
}

export default VideoMain