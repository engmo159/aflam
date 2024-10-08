import MediaHero from '../components/mediaDetails/MediaHero'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import {
  getCreditDetails,
  getImageDetails,
  getMediaDetails,
  getVideoDetails,
} from '../redux/slices/mediaDetailsSlice'

import Loading from '../components/Loading'

import { changePageLoading } from '../redux/slices/moviesSlice'
import SliderLayout from '../components/mediaDetails/SliderLayout'
import { SwiperSlide } from 'swiper/react'
import VideoSlider from '../components/mediaDetails/VideoSlider'
import PosterLayout from '../components/mediaDetails/PosterLayout'
import ReviewSection from '../components/mediaDetails/ReviewSection'
const MediaDetails = () => {
  const dispatch = useDispatch()
  const {
    videoDetail,
    mediaDetailLoading,
    logoDetail,
    posterDetail,
    backdropDetail,
  } = useSelector(state => state.mediaDetailReducer)
  const { mediaType, mediaId } = useParams()

  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getMediaDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getCreditDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getVideoDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getImageDetails({ mediaCategory: mediaType, mediaId }))
  }, [mediaId, mediaType, dispatch])

  const { pageLoading } = useSelector(state => state.moviesReducer)

  if (pageLoading) {
    return <Loading load={mediaDetailLoading} />
  }
  return (
    <div>
      <MediaHero />

      <div className='bg-white text-black dark:bg-black dark:text-white w-full z-10 relative px-[5%] pt-16 flex flex-col gap-28'>
        {/* images && videos  */}
        <SliderLayout header='Videos'>
          {videoDetail?.length > 0 &&
            videoDetail?.slice(0, 10).map((media, index) => (
              <SwiperSlide key={index} className='w-full'>
                <VideoSlider media={media} />
              </SwiperSlide>
            ))}
        </SliderLayout>
        <SliderLayout header='backdrops'>
          {backdropDetail?.length > 0 &&
            backdropDetail?.slice(0, 10).map((media, index) => (
              <SwiperSlide key={index} className='w-full'>
                <img
                  src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
                    media?.file_path
                  }`}
                  alt={'Movie Poster'}
                />
              </SwiperSlide>
            ))}
        </SliderLayout>
        <PosterLayout header='posters'>
          {posterDetail?.length > 0 &&
            posterDetail?.slice(0, 10).map((media, index) => (
              <SwiperSlide key={index} className='w-full'>
                <img
                  src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
                    media?.file_path
                  }`}
                  alt={'Movie Poster'}
                />
              </SwiperSlide>
            ))}
        </PosterLayout>
        <PosterLayout header='logos'>
          {logoDetail?.length > 0 &&
            logoDetail?.slice(0, 10).map((media, index) => (
              <SwiperSlide key={index} className='w-full'>
                <img
                  src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
                    media?.file_path
                  }`}
                  alt={'Movie Poster'}
                />
              </SwiperSlide>
            ))}
        </PosterLayout>
        {/* reviews  */}
        <ReviewSection />
      </div>
    </div>
  )
}

export default MediaDetails
