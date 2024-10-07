import { useEffect } from 'react'
import Hero from '../components/Hero'
import SwiperLayout from '../components/SwiperLayout'
import Loading from '../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import {
  changePageLoading,
  getGenreMoviesList,
  getPopularMovies,
  getTopRatedMovies,
} from '../redux/slices/moviesSlice'
import {
  getGenreSeriesList,
  getPopularSeries,
  getTopRatedSeries,
} from '../redux/slices/seriesSlice'
import { getPersonDetails } from '../redux/slices/personDetailsSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { popularSeries, topRatedSeries } = useSelector(
    state => state.seriesReducer
  )
  const {
    pageLoading,
    popularMovies,
    topRatedMovies,
    popularMoviesLoading,
    genreMovieList,
  } = useSelector(state => state.moviesReducer)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(changePageLoading(true))
      await Promise.all([
        dispatch(getTopRatedMovies()),
        dispatch(getPopularMovies()),
        dispatch(getGenreMoviesList()),
        dispatch(getTopRatedSeries()),
        dispatch(getPopularSeries()),
        dispatch(getGenreSeriesList()),
      ])
      dispatch(changePageLoading(false))
    }

    fetchData()
  }, [])

  useEffect(() => {
    dispatch(changePageLoading(true))
  }, [])

  if (pageLoading) {
    return <Loading load={popularMoviesLoading} />
  }
  return (
    <div>
      <Hero
        displayedItems={popularMovies}
        genre={genreMovieList}
        mediaType='movie'
      />

      <SwiperLayout
        media={popularMovies}
        mediaType='movie'
        header='Popular Movies'
      />
      <SwiperLayout
        media={popularSeries}
        mediaType='tv'
        header='Popular Series'
      />
      <SwiperLayout
        media={topRatedMovies}
        mediaType='movie'
        header='Top Rated Movies'
      />
      <SwiperLayout
        media={topRatedSeries}
        mediaType='tv'
        header='Top Rated Series'
      />
    </div>
  )
}

export default Home
