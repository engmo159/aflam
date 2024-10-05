import { useEffect } from 'react'
import Hero from '../components/Hero'
import SwiperLayout from '../components/SwiperLayout'
import Loading from '../components/Loading'

import { useDispatch, useSelector } from 'react-redux'
import {
  getPopularMovies,
  getTopRatedMovies,
} from '../redux/slices/moviesSlice'
import {
  getPopularSeries,
  getTopRatedSeries,
} from '../redux/slices/seriesSlice'
const Home = () => {
  const dispatch = useDispatch()

  const { popularSeries, topRatedSeries } = useSelector(
    state => state.seriesReducer
  )
  const { pageLoading, popularMovies, topRatedMovies } = useSelector(
    state => state.moviesReducer
  )

  useEffect(() => {
    dispatch(getPopularMovies())
    dispatch(getTopRatedMovies())
    dispatch(getTopRatedSeries())
    dispatch(getPopularSeries())
  }, [])
  return (
    <div>
      {pageLoading ? (
        <Loading />
      ) : (
        <>
          <Hero />
          <SwiperLayout media={popularMovies} header='Popular Movies' />
          <SwiperLayout media={popularSeries} header='Popular Series' />
          <SwiperLayout media={topRatedMovies} header='Top Rated Movies' />
          <SwiperLayout media={topRatedSeries} header='Top Rated Series' />
        </>
      )}
    </div>
  )
}

export default Home
