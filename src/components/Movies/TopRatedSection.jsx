import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "./MovieCard";
import { BarLoader } from "react-spinners";
import {
  getTopRatedMovies,
  topRatedLoadMore,
} from "../../redux/slices/moviesSlice";

const TopRatedSection = () => {
  const dispatch = useDispatch();
  const {
    topRatedMovies,
    topRatedMoviesLoading,
    topRatedMoviesErr,
    topRatedMoviesVisible,
    topRatedMoviesPage,
  } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(getTopRatedMovies(topRatedMoviesPage));
  }, [topRatedMoviesPage]);

  if (topRatedMoviesErr) {
    return <h1>{topRatedMoviesErr}</h1>;
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2  items-center justify-center place-content-center">
      {topRatedMovies?.slice(0, topRatedMoviesVisible)?.map((movie, index) => (
        <div key={index}>
          <MovieCard movie={movie} />
        </div>
      ))}
      <Button
        onClick={() => dispatch(topRatedLoadMore())}
        className="flex justify-center lg:col-span-4 md:col-span-2 col-span-1 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold">
        {topRatedMoviesLoading ? (
          <BarLoader color="red" className="my-2.5" />
        ) : (
          "LOAD MORE"
        )}
      </Button>
    </div>
  );
};

export default TopRatedSection;
