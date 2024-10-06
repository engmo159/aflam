import React from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import MovieCard from "../Movies/MovieCard";
import { popularSeriesLoadMore } from "../../redux/slices/seriesSlice";

const SeriesPopularSection = () => {
  const dispatch = useDispatch();
  const {
    popularSeries,
    popularSeriesLoading,
    popularSeriesErr,
    popularSeriesVisible,
  } = useSelector((state) => state.seriesReducer);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-2  items-center justify-center place-content-center">
      {popularSeries?.slice(0, popularSeriesVisible).map((series, index) => (
        <div key={index}>
          <MovieCard movie={series} />
        </div>
      ))}

      <Button
        onClick={() => dispatch(popularSeriesLoadMore())}
        className="flex justify-center col-span-4 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold">
        {popularSeriesLoading ? (
          <BarLoader color="red" className="my-2.5" />
        ) : (
          "LOAD MORE"
        )}
      </Button>
    </div>
  );
};

export default SeriesPopularSection;
