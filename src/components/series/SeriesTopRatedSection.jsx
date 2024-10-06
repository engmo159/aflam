import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import {
  getTopRatedSeries,
  topRatedSeriesLoadMore,
} from "../../redux/slices/seriesSlice";
import MovieCard from "../Movies/MovieCard";

const SeriesTopRatedSection = () => {
  const dispatch = useDispatch();
  const {
    topRatedSeries,
    topRatedSeriesLoading,
    topRatedSeriesErr,
    topRatedSeriesVisible,
    topRatedSeriesPage,
  } = useSelector((state) => state.seriesReducer);
  useEffect(() => {
    dispatch(getTopRatedSeries(topRatedSeriesPage));
  }, [topRatedSeriesPage]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2  items-center justify-center place-content-center">
      {topRatedSeries?.slice(0, topRatedSeriesVisible)?.map((series, index) => (
        <div key={index}>
          <MovieCard movie={series} />
        </div>
      ))}
      <Button
        onClick={() => dispatch(topRatedSeriesLoadMore())}
        className="flex justify-center col-span-4 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold">
        {topRatedSeriesLoading ? (
          <BarLoader color="red" className="my-2.5" />
        ) : (
          "LOAD MORE"
        )}
      </Button>
    </div>
  );
};

export default SeriesTopRatedSection;
