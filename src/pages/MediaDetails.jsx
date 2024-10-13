import MediaHero from '../components/mediaDetails/MediaHero'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import {
  getCreditDetails,
  getImageDetails,
  getMediaDetails,
  getRecommendedDetails,
  getReviewsDetails,
  getVideoDetails,
  resetVisible,
} from '../redux/slices/mediaDetailsSlice'

import Loading from '../components/Loading'

import { changePageLoading } from '../redux/slices/moviesSlice'
import SliderLayout from '../components/mediaDetails/SliderLayout'
import { SwiperSlide } from 'swiper/react'
import VideoSlider from '../components/mediaDetails/VideoSlider'

// import PosterLayout from '../components/mediaDetails/PosterLayout'
import ReviewSection from '../components/mediaDetails/ReviewSection'

import RecommendedSwiper from '../components/mediaDetails/RecommendedSwiper'
import Seasons from '../components/mediaDetails/Seasons'
// import { Typography } from '@material-tailwind/react'
import MovieCollection from '../components/mediaDetails/MovieCollection'

const MediaDetails = () => {
  const dispatch = useDispatch()
  const {
    videoDetail,
    mediaDetailLoading,
    // posterDetail,
    backdropDetail,
    recommendedDetails,
    mediaDetail,
  } = useSelector(state => state.mediaDetailReducer)

  const { mediaType, mediaId } = useParams()

  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getMediaDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getCreditDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getVideoDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getImageDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getReviewsDetails({ mediaCategory: mediaType, mediaId, page: 1 }))
    dispatch(resetVisible())
    dispatch(
      getRecommendedDetails({ mediaCategory: mediaType, mediaId, page: 1 })
    )
  }, [mediaId, mediaType, dispatch])

  const { pageLoading } = useSelector(state => state.moviesReducer)

  if (pageLoading) {
    return <Loading load={mediaDetailLoading} />
  }
  return (
    <div>
      <MediaHero mediaType={mediaType} mediaId={mediaId} />
      <div className='bg-white text-black dark:bg-black dark:text-white w-full z-10 relative px-[5%] pt-16 flex flex-col gap-16'>
        {/* seasons  */}
        {mediaType == 'tv' ? (
          <Seasons mediaType={mediaType} mediaId={mediaId} />
        ) : (
          mediaDetail?.belongs_to_collection && <MovieCollection />
        )}
        {/* images && videos  */}
        <SliderLayout header='Videos'>
          {videoDetail?.length > 0 ? (
            videoDetail?.slice(0, 10).map((media, index) => (
              <SwiperSlide key={index} className='w-full h-[40rem]'>
                <VideoSlider media={media} />
              </SwiperSlide>
            ))
          ) : (
            <div className='w-full py-10 text-xl'>No videos yet.</div>
          )}
        </SliderLayout>

        <SliderLayout header='backdrops'>
          {backdropDetail?.length > 0 ? (
            backdropDetail?.slice(0, 10).map((media, index) => (
              <SwiperSlide key={index} className='w-full h-fit'>
                <img
                  src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
                    media?.file_path
                  }`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </SwiperSlide>
            ))
          ) : (
            <div className='w-full py-10 text-xl'>No backdrops yet.</div>
          )}
        </SliderLayout>
        {/* <PosterLayout header='posters'>
          {posterDetail?.length > 0 &&
            posterDetail?.slice(0, 10).map((media, index) => (
              <SwiperSlide key={index} className='w-full h-full'>
                <img
                  src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
                    media?.file_path
                  }`}
                  alt={'Movie Poster'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </SwiperSlide>
            ))}
        </PosterLayout> */}

        {/* reviews  */}
        <ReviewSection mediaType={mediaType} />
        <RecommendedSwiper
          media={recommendedDetails}
          mediaType='movie'
          header='you may also like'
        />
      </div>
    </div>
  )
}

export default MediaDetails
