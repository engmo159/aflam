/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

const PosterLayout = ({ header, children }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography
          variant="h4"
          className="uppercase text-black dark:text-white"
        >
          {header}
        </Typography>
        <div className='h-1.5 bg-ourRed w-24' />
      </div>
      <div className="h-full z-20">
        <Swiper
          grabCursor={true}
          style={{ width: '100%', height: '100%' }}
          spaceBetween={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
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
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
          className="mySwiper z-20"
        >
          {children}
        </Swiper>
      </div>
    </div>
  );
};

export default PosterLayout;
