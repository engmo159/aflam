import MovieCard from './Movies/MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

const SwiperLayout = ({ media, header }) => {
  return (
    <div className='flex flex-col gap-8 px-12 py-4 h-full overflow-hidden'>
      <div>
        <h1 className='font-bold text-3xl'>{header}</h1>
      </div>
      <div className='w-full h-full'>
        <Swiper
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={0}
          grabCursor={true}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[Pagination]}
          className='mySwiper'
        >
          {media?.map((movie, index) => (
            <SwiperSlide key={index}>
              <div>
                <MovieCard movie={movie} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default SwiperLayout
