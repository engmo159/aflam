/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";

const SliderLayout = ({ header, children }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Typography
          variant="h4"
          className="uppercase text-black dark:text-white"
        >
          {header}
        </Typography>
        <div className="h-1.5 bg-ourRed w-24" />
      </div>
      <div className="h-full w-full z-20">
        <Swiper
          grabCursor={true}
          style={{ width: "100%", height: "100%" }}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
          }}
          className="mySwiper z-20"
        >
          {children}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderLayout;
