import MediaHero from '../components/mediaDetails/MediaHero'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import {
  getCreditDetails,
  getMediaDetails,
  getVideoDetails,
} from '../redux/slices/mediaDetailsSlice'

import Loading from '../components/Loading'

import { changePageLoading } from '../redux/slices/moviesSlice'
import SliderLayout from '../components/mediaDetails/SliderLayout'
import { SwiperSlide } from 'swiper/react'
import VideoSlider from '../components/mediaDetails/VideoSlider'
const MediaDetails = () => {
  const dispatch = useDispatch()
  const { videoDetail, mediaDetailLoading } = useSelector(
    state => state.mediaDetailReducer
  )
  const { mediaType, mediaId } = useParams()

  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getMediaDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getCreditDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getVideoDetails({ mediaCategory: mediaType, mediaId }))
  }, [mediaId, mediaType, dispatch])

  const { pageLoading } = useSelector(state => state.moviesReducer)

  if (pageLoading) {
    return <Loading load={mediaDetailLoading} />
  }
  return (
    <div>
      <MediaHero />
      <div className='bg-white text-black dark:bg-black dark:text-white w-full z-10 relative px-[5%] pt-16'>
        <SliderLayout header='Videos'>
          {videoDetail?.length > 0 &&
            videoDetail?.map((media, index) => (
              <SwiperSlide key={index} className='w-full'>
                <VideoSlider media={media} />
              </SwiperSlide>
            ))}
        </SliderLayout>
      </div>
    </div>
  )
}

export default MediaDetails
