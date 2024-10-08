/* eslint-disable react/prop-types */
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Button, Typography } from '@material-tailwind/react'
import { BiSolidRightArrow } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { FaRegHeart } from 'react-icons/fa6'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Link } from 'react-router-dom'

const MediaHero = () => {
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

      <div className='h-52 block relative  w-full' />
      {/* Main Content */}

      <div className='relative z-20 flex px-[7%] gap-8 w-full '>
        {/* gradient div s  */}
        {/* bottom  */}

        <div className='absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t  from-white to-white/95 dark:from-black dark:to-black z-10' />
        {/* top  */}
        <div className='absolute inset-x-0 top-[4.5rem] h-1/6 bg-gradient-to-t  from-white/60 dark:from-black to-transparent z-10' />
        {/* middle  */}
        <div className='absolute inset-x-0 top-1/4 h-1/6 bg-gradient-to-t from-white/20 to-white/10 dark:from-black/90 dark:to-black/50  z-10' />

        {/* end gradient div s  */}
        {/* Media Poster */}
        {posterImage && (
          <div className='w-[40%] z-20'>
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
        <div className='text-white flex flex-col z-20 gap-12 w-[53%]'>
          <h1 className='text-6xl font-bold'>
            {mediaDetail?.title || mediaDetail?.name}
          </h1>
          <div className='flex gap-4 items-center'>
            {/* Rating */}
            <div className='w-12 h-12'>
              <CircularProgressbar
                value={
                  mediaDetail?.vote_average ? mediaDetail.vote_average * 10 : 0
                }
                text={
                  mediaDetail?.vote_average
                    ? mediaDetail.vote_average.toFixed(1)
                    : 'N/A'
                }
                styles={buildStyles({
                  textColor: 'white',
                  pathColor: 'green',
                  trailColor: 'transparent',
                })}
              />
            </div>
            {/* genre  */}
            <div className='flex gap-2'>
              {(mediaDetail?.genres || []).slice(0, 2).map((genre, index) => (
                <p
                  key={index}
                  color='red'
                  className='text-sm font-normal bg-red-800 p-2 rounded-xl'
                >
                  {genre.name || ''}
                </p>
              ))}
            </div>
          </div>
          {/* Overview */}
          <p className='text-black dark:text-white font-bold'>
            {mediaDetail?.overview}
          </p>
          {/* buttons  */}
          <div className='flex gap-12'>
            {/* heart button  */}
            <button className='flex w-max gap-2 items-center justify-center font-normal text-red-800'>
              <FaRegHeart className='text-2xl' />
            </button>
            {/* Watch Now Button */}
            <a href='#video'>
              <Button
                color='red'
                className='flex w-max gap-2 text-md items-center justify-center font-normal'
              >
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
              <div className='h-1.5 bg-red-800 w-[20%]' />
            </div>
            <Swiper
              grabCursor={true}
              loop={true}
              style={{ width: '100%', height: '100%' }}
              slidesPerView={4}
              slidesPerGroup={4}
              spaceBetween={10}
            >
              {castDetail?.length > 0 &&
                castDetail?.map((cast, index) => (
                  <SwiperSlide key={index} className='h-52 w-full'>
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
                          {cast?.name}
                        </h1>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaHero
