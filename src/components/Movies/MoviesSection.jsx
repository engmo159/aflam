import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeToPopular,
  changeToTopRated,
} from "../../redux/slices/moviesSlice";
import PopularSection from "./PopularSection";
import TopRatedSection from "./TopRatedSection";

const MoviesSection = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.themeReducer);
  const { isItPopular } = useSelector((state) => state.moviesReducer);

  return (
    <section className="px-14 py-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography variant="h4">Movies</Typography>
        <div className="flex gap-2">
          <Button
            variant="text"
            className={`${
              isItPopular
                ? `text-white bg-red-600 hover:bg-red-700`
                : `bg-transparent  text-black dark:text-white`
            } text-sm `}
            onClick={() => dispatch(changeToPopular())}>
            Popular
          </Button>
          <Button
            variant="text"
            className={`${
              !isItPopular
                ? `text-white bg-red-600 hover:bg-red-700`
                : `bg-transparent  text-black dark:text-white`
            } text-sm`}
            onClick={() => dispatch(changeToTopRated())}>
            Top Rated
          </Button>
        </div>
      </div>
      <div>{isItPopular ? <PopularSection /> : <TopRatedSection />}</div>
    </section>
  );
};

export default MoviesSection;
