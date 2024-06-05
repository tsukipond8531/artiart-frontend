"use client"
import React from 'react'
const VideoMain = () => {
  return (
    <video className='w-full object-cover h-[100%]' controls={false} loop muted  autoPlay playsInline>
      <source src='/assets/images/main.mp4' type="video/mp4" />
    </video>
  )
}
export default VideoMain