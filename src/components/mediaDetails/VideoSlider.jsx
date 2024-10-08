import { useSelector } from 'react-redux'

/* eslint-disable react/prop-types */

const VideoSlider = ({ media }) => {
  const videoUrl = `https://www.youtube.com/embed/${media?.key}`
  const { videoDetailLoading } = useSelector(state => state.mediaDetailReducer)
  if (videoDetailLoading) {
    return <span className='loader'></span>
  }
  return (
    <div className='h-full w-full' id='video'>
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
