/* eslint-disable react/prop-types */
import { Typography } from '@material-tailwind/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import MovieCard from '../Movies/MovieCard'
import { useSelector } from 'react-redux'

const Seasons = ({ mediaType, mediaId }) => {
  const { mediaDetail } = useSelector(state => state.mediaDetailReducer)
  return (
    <div>
      {/* head name  */}
      <div>
        <Typography
          variant='h4'
          className='uppercase text-black dark:text-white'
        >
          Seasons
        </Typography>
        <div className='h-1.5 bg-ourRed w-24' />
      </div>
      {/* slider  */}
      <div className='flex flex-col gap-8 px-4 lg:px-20 py-10 h-full overflow-hidden'>
        <div className='w-full h-full'>
          <Swiper
            lazy='true'
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            centeredSlides={false}
            spaceBetween={0}
            grabCursor={true}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Pagination]}
            className='mySwiper'
          >
            {mediaDetail?.seasons?.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieCard
                  movie={movie}
                  mediaId={mediaId}
                  mediaType={mediaType}
                  session
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Seasons
