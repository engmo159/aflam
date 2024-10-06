import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import { popularLoadMore } from "../../redux/slices/moviesSlice";
import MovieCard from "./MovieCard";


const PopularSection = () => {
  const dispatch = useDispatch();
  const {
    popularMovies,
    popularMoviesLoading,
    popularMoviesErr,
    popularMoviesVisible,
  } = useSelector((state) => state.moviesReducer);

  if (popularMoviesErr) {
    return <h1>{popularMoviesErr}</h1>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-2  items-center justify-center place-content-center">
      {popularMovies?.slice(0, popularMoviesVisible).map((movie, index) => (
        <div key={index}>
          <MovieCard movie={movie} />
        </div>
      ))}

      <Button
        onClick={() => dispatch(popularLoadMore())}
        className="flex justify-center col-span-4 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold">
        {popularMoviesLoading ? (
          <BarLoader color="red" className="my-2.5" />
        ) : (
          "LOAD MORE"
        )}
      </Button>
    </div>
  );
};

export default PopularSection;
