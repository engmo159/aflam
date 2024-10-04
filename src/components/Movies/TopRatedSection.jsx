import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "./MovieCard";
import { FadeLoader } from "react-spinners";
import { getTopRatedMovies, topRatedLoadMore } from "../../redux/slices/moviesSlice";

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
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2  items-center justify-center place-content-center">
      {topRatedMoviesLoading && (
        <div className="w-full h-full col-start-3 mt-96">
          <FadeLoader />
        </div>
      )}
      {topRatedMovies?.slice(0, topRatedMoviesVisible)?.map((movie, index) => (
        <div key={index}>
          <MovieCard movie={movie} />
        </div>
      ))}
      {!topRatedMoviesLoading && (
        <Button
          onClick={() => dispatch(topRatedLoadMore())}
          className="col-span-4 bg-transparent shadow-none text-red-600 text-md hover:shadow-none hover:bg-red-50 rounded-sm font-bold">
          LOAD MORE
        </Button>
      )}
    </div>
  );
};

export default TopRatedSection;
