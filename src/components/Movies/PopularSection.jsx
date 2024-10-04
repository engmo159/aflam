import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { FadeLoader } from "react-spinners";
import {
  getPopularMovies,
  popularLoadMore,
} from "../../redux/slices/moviesSlice";

const PopularSection = () => {
  const dispatch = useDispatch();
  const {
    popularMovies,
    popularMoviesLoading,
    popularMoviesErr,
    popularMoviesVisible,
    popularMoviesPage,
  } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(getPopularMovies(popularMoviesPage));
  }, [popularMoviesPage]);

  if (popularMoviesErr) {
    return <h1>{popularMoviesErr}</h1>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-2  items-center justify-center place-content-center">
      {popularMoviesLoading && (
        <div className="w-full h-full col-start-3 mt-96">
          <FadeLoader />
        </div>
      )}
      {popularMovies?.slice(0, popularMoviesVisible).map((movie, index) => (
        <div key={index}>
          <MovieCard movie={movie} />
        </div>
      ))}
      {!popularMoviesLoading && (
        <Button
          onClick={() => dispatch(popularLoadMore())}
          className="col-span-4 bg-transparent shadow-none text-red-600 text-md hover:shadow-none hover:bg-red-50 rounded-sm font-bold">
          LOAD MORE
        </Button>
      )}
    </div>
  );
};

export default PopularSection;
