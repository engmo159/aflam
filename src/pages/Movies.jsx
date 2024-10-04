
import Hero from "../components/Hero";
import MoviesSection from "../components/Movies/MoviesSection";


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
