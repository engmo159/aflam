import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import MoviesSection from "../components/Movies/MoviesSection";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { loadingFinish } from "../redux/slices/moviesSlice";

const Movies = () => {

  const { pageLoading } = useSelector((state) => state.moviesReducer);

  return (
    <div>
      {pageLoading ? (
        <Loading />
      ) : (
        <div>
          <Hero />
          <MoviesSection />
        </div>
      )}
    </div>
  );
};

export default Movies;
