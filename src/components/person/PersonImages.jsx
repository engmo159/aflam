import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";

const PersonImages = () => {
  const { personImages } = useSelector((state) => state.personDetailsReducer);

  return (
    <div className="flex flex-col gap-8 lg:px-20 py-5 h-full overflow-hidden">
      <div className="flex flex-col gap-1 ">
        <h1 className="font-bold text-3xl">Images</h1>
        <hr className="w-28 border-[3px] border-red-600 " />
      </div>
      <div className="w-full h-full">
        <Swiper
          lazy="true"
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
          className="mySwiper"
        >
          {personImages?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="m-1">
                <img
                  className="h-full w-full object-cover object-center"
                  src={`${import.meta.env.VITE_BASE_TMDB_POSTER_PATH}${
                    image.file_path
                  }`}
                  alt="nature image"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PersonImages;
