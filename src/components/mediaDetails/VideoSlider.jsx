/* eslint-disable react/prop-types */
import React from 'react'

const VideoSlider = ({ media }) => {
  const videoUrl = `${import.meta.env.VITE_BASE_TMDB_YouTube}/${media?.key}`
  return (
    <div className='h-full w-full'>
      <iframe
        key={media.key}
        className='h-full w-full rounded-lg'
        src={media.key ? videoUrl : ''}
        title={media.name || 'Video'}
        width='100%'
        allowFullScreen
        loading='lazy'
        style={{ border: 0 }}
      ></iframe>
    </div>
  )
}

export default VideoSlider
