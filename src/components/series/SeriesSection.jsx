import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  seriesChangeToPopular,
  seriesChangeToTopRated,
} from "../../redux/slices/seriesSlice";
import SeriesPopularSection from "./SeriesPopularSection";
import SeriesTopRatedSection from "./SeriesTopRatedSection";

const SeriesSection = () => {
  const dispatch = useDispatch();
  const { seriesIsItPopular } = useSelector((state) => state.seriesReducer);

  return (
    <section className="px-14 py-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography variant="h4">TV Series</Typography>
        <div className="flex gap-2">
          <Button
            variant="text"
            className={`${
              seriesIsItPopular
                ? `text-white bg-red-600 hover:bg-red-700`
                : `bg-transparent  text-black dark:text-white`
            } text-sm `}
            onClick={() => dispatch(seriesChangeToPopular())}>
            Popular
          </Button>
          <Button
            variant="text"
            className={`${
              !seriesIsItPopular
                ? `text-white bg-red-600 hover:bg-red-700`
                : `bg-transparent  text-black dark:text-white`
            } text-sm`}
            onClick={() => dispatch(seriesChangeToTopRated())}>
            Top Rated
          </Button>
        </div>
      </div>
      <div>
        {seriesIsItPopular ? (
          <SeriesPopularSection />
        ) : (
          <SeriesTopRatedSection />
        )}
      </div>
    </section>
  );
};

export default SeriesSection;
