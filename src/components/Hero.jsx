/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'react-circular-progressbar/dist/styles.css'
import { Button } from '@material-tailwind/react'
import { BiSolidRightArrow } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import RadialRatingBar from './Movies/RadialRatingBar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getGenreMoviesList } from '../redux/slices/moviesSlice'
import { getGenreSeriesList } from '../redux/slices/seriesSlice'

const Hero = ({ displayedItems, genre, mediaType }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGenreMoviesList())
    dispatch(getGenreSeriesList())
  }, [])
  return (
    <div className='relative h-screen overflow-hidden'>
      <Swiper
        grabCursor={true}
        loop={true}
        style={{ width: '100%', height: '100%' }}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{
          delay: 10000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {displayedItems?.length > 0 &&
          displayedItems?.map((movie, index) => (
            <SwiperSlide key={index} className='relative h-full w-full'>
              <div
                className='h-full w-full bg-center bg-no-repeat flex items-center justify-center'
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_BASE_TMDB_POSTER_PATH
                  }${movie?.backdrop_path || movie?.poster_path})`,
                  backgroundSize: 'cover',
                }}
              />
              <div className='z-50 absolute inset-0 flex flex-col justify-center pl-[10%] lg:w-1/2 gap-10'>
                {/* title  */}
                <h1 className=' text-black dark:text-white lg:text-7xl md:text-6xl text-4xl font-bold'>
                  {movie?.title || movie?.name}
                </h1>
                <div className='flex gap-4 items-center'>
                  {/* rate */}
                  <div className='w-12 h-12'>
                    <RadialRatingBar movie={movie} />
                  </div>
                  {/* genre  */}
                  <div className='flex gap-2'>
                    {movie.genre_ids
                      .map(genreId => genre?.find(g => g.id === genreId)?.name)
                      .splice(0, 2)
                      .map((genreName, index) => (
                        <p
                          key={index}
                          className='text-sm font-normal bg-ourRed p-2 rounded-3xl text-white'
                        >
                          {genreName || ''}
                        </p>
                      ))}
                  </div>
                </div>
                {/* overview  */}
                <p>{movie?.overview}</p>
                {/* button  */}

                <Link to={`/${mediaType}/${movie?.id}`}>
                  <Button className='flex w-max gap-2 text-md bg-ourRed items-center justify-center font-normal'>
                    <BiSolidRightArrow />
                    Watch Now
                  </Button>
                </Link>
              </div>
              <div className='absolute z-10 inset-0 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none' />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
export default Hero
