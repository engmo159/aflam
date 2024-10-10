import { useDispatch, useSelector } from 'react-redux'
import Hero from '../components/Hero'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import {
  changePageLoading,
  getPopularMovies,
} from '../redux/slices/moviesSlice'
import MoviesSection from '../components/Movies/MoviesSection'

const Movies = () => {
  const {
    pageLoading,
    popularMoviesLoading,
    genreMovieList,
    popularMovies,
    popularMoviesPage,
  } = useSelector(state => state.moviesReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePageLoading(true))
  }, [])

  useEffect(() => {
    dispatch(getPopularMovies(popularMoviesPage))
  }, [popularMoviesPage])

  if (pageLoading) {
    return <Loading load={popularMoviesLoading} />;
  }

  return (
    <div className='pb-10'>
      <Hero
        displayedItems={popularMovies}
        genre={genreMovieList}
        mediaType='movie'
      />
      <MoviesSection />
    </div>
  );
};

export default Movies;
