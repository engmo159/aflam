/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import MovieCard from './Movies/MovieCard'

const SwiperLayout = ({ media, mediaType, header }) => {
  return (
    <div className='flex flex-col gap-8 px-4 lg:px-20 py-10 h-full overflow-hidden'>
      <div className='flex flex-col gap-1 '>
        <h1 className='font-bold text-3xl'>{header}</h1>
        <hr className='w-28 border-[3px] border-ourRed ' />
      </div>
      <div className="w-full h-full">
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
          className="mySwiper">
          {media?.map((movie, index) => (
            <SwiperSlide key={index}>
              <div>
                <MovieCard movie={movie} mediaType={mediaType} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperLayout;
