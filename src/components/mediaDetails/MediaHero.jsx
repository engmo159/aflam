/* eslint-disable react/prop-types */
import 'react-circular-progressbar/dist/styles.css'
import { Button, Typography } from '@material-tailwind/react'
import { BiSolidRightArrow } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Link } from 'react-router-dom'
import RadialRatingBar from '../Movies/RadialRatingBar'

import FavoritesButton from '../userProfile/FavoritesButton'

const MediaHero = ({ mediaType, mediaId }) => {
  const { mediaDetail, castDetail } = useSelector(
    state => state.mediaDetailReducer
  )
  const backdropImage = mediaDetail?.backdrop_path || mediaDetail?.poster_path
  const posterImage = mediaDetail?.poster_path
  return (
    <div className='relative overflow-hidden'>
      {/* Fixed Background Image */}
      <div
        className='fixed inset-0 h-screen w-full bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_BASE_TMDB_POSTER_PATH
          }${backdropImage})`,
          backgroundSize: 'cover',
          zIndex: 1,
        }}
      />

      <div className='lg:h-52 h-24 block relative w-full' />
      {/* Main Content */}

      <div className='lg:relative flex-col lg:flex-row items-center z-20 flex px-[7%] gap-8 w-full '>
        {/* gradient div s  */}
        {/* bottom  */}

        <div className='absolute inset-x-0 bottom-0 lg:h-3/4 h-[100%] bg-gradient-to-t from-white lg:to-white to-white/90 dark:from-black dark:to-black/90 z-10' />
        {/* top  */}
        <div className='absolute inset-x-0 top-[5rem] h-1/6 lg:bg-gradient-to-t from-white from-10% dark:from-black via-white/90 via-30% to-transparent z-10' />

        <div className='absolute inset-x-0 top-[5.1rem] h-1/6 lg:bg-gradient-to-t from-white from-10% dark:from-black via-white/90 via-30% to-transparent z-10' />

        {/* middle  */}
        <div className='absolute inset-x-0 top-1/4 h-1/6 lg:bg-gradient-to-t from-white/20 to-white/10 dark:from-black/90 dark:to-black/50  z-10' />

        {/* end gradient div s  */}
        {/* Media Poster */}
        {posterImage && (
          <div className='lg:w-[40%] z-20'>
            <img
              src={`${
                import.meta.env.VITE_BASE_TMDB_POSTER_PATH
              }${posterImage}`}
              alt={mediaDetail?.title || mediaDetail?.name}
              className='rounded-lg shadow-lg w-full'
            />
          </div>
        )}
        {/* Media Details */}
        <div className='dark:text-white  text-blue-gray-900 flex flex-col z-20 lg:gap-12 gap-8 lg:w-[53%] w-[90%]'>
          <h1 className='lg:text-6xl text-5xl lg:pt-32 font-bold'>
            {mediaDetail?.title || mediaDetail?.name || 'No Title Available'}
          </h1>
          <div className='flex gap-4 items-center'>
            {/* Rating */}
            <div className='lg:w-12 lg:h-12 md:w-24 md:h-24'>
              <RadialRatingBar movie={mediaDetail} />
            </div>
            {/* genre  */}
            <div className='flex gap-2'>
              {(mediaDetail?.genres || []).slice(0, 2).map((genre, index) => (
                <p
                  key={index}
                  color='red'
                  className='lg:text-sm text-2xl text-white font-normal bg-ourRed px-3.5 py-1.5 rounded-3xl'
                >
                  {genre.name || ''}
                </p>
              ))}
            </div>
          </div>
          {/* Overview */}
          <p className='text-black dark:text-white font-bold lg:text-lg text-xl'>
            {mediaDetail?.overview || 'No Overview Available'}
          </p>
          {/* buttons  */}
          <div className='flex gap-12'>
            {/* heart button  */}
            <FavoritesButton mediaType={mediaType} mediaId={mediaId} />
            {/* Watch Now Button */}
            <a href='#video'>
              <Button className='flex w-max gap-2 lg:text-md text-2xl items-center justify-center font-normal bg-ourRed rounded-md'>
                <BiSolidRightArrow />
                Watch Now
              </Button>
            </a>
          </div>
          {/* cast  */}
          <div className='flex flex-col gap-4'>
            <div>
              <Typography
                variant='h4'
                className='uppercase text-black dark:text-white'
              >
                cast
              </Typography>
              <div className='h-1.5 bg-ourRed w-[20%]' />
            </div>
            <Swiper
              grabCursor={true}
              loop={true}
              style={{ width: '100%', height: '100%' }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                1280: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
              }}
              spaceBetween={10}
            >
              {castDetail?.length > 0 ? (
                castDetail?.map((cast, index) => (
                  <SwiperSlide key={index} className='lg:h-52 h-96 w-full'>
                    <Link to={`/person/${cast.id}`}>
                      <div
                        className='h-full w-full bg-center bg-no-repeat flex items-end justify-center rounded-sm'
                        style={{
                          backgroundImage: `url(${
                            import.meta.env.VITE_BASE_TMDB_POSTER_PATH
                          }${cast?.profile_path})`,
                          backgroundSize: 'cover',
                        }}
                      >
                        {/* title  */}
                        <h1 className=' text-white text-center overflow-hidden py-2 w-full bg-black/40'>
                          {cast?.name || 'No cast name available'}
                        </h1>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <h1>No Cast Data available</h1>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaHero
