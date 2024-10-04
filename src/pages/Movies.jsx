import { useEffect } from "react";
import Hero from "../components/Hero";
import MoviesSection from "../components/Movies/MoviesSection";
import {
  getGenreMoviesList,
  getPopularMovies,
} from "../redux/slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

const Movies = () => {
  const { popularMoviesLoading, popularMoviesPage } = useSelector(
    (state) => state.moviesReducer
  );

  return (
    <div>
      <Hero />
      <MoviesSection />
    </div>
  );
};

export default Movies;
