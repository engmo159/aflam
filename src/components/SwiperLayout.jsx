import MovieCard from './Movies/MovieCard'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getPopularMovies } from '../redux/slices/moviesSlice'
const SwiperLayout = () => {
  const dispatch = useDispatch()
  const { popularMovies, popularMoviesErr } = useSelector(
    state => state.moviesReducer
  )

  useEffect(() => {
    dispatch(getPopularMovies())
  }, [])

  if (popularMoviesErr) {
    return <h1>{popularMoviesErr}</h1>
  }

  return (
    <div className='flex flex-col gap-12 mx-4 overflow-hidden'>
      <div>
        <h1 className='font-bold text-xl'>Popular Movies</h1>
      </div>
      <div className='w-full h-full'>
        <Swiper
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={0}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className='mySwiper'
        >
          {popularMovies?.map((movie, index) => (
            <div key={index}>
              movie&&
              <SwiperSlide>
                <MovieCard movie={movie} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default SwiperLayout
