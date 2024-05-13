"use client"

import React from 'react'

const VideoMain = () => {
  return (
    <div>
<video className='w-full object-cover h-[100%]' controls={false} loop muted  autoPlay >
      <source src='/assets/images/main.mp4' type="video/mp4" />
    
    </video>

    </div>
  )
}

export default VideoMain