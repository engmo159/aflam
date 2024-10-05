import { useEffect } from 'react'
import Hero from '../components/Hero'
import SwiperLayout from '../components/SwiperLayout'
import Loading from '../components/Loading'

import { useDispatch, useSelector } from 'react-redux'
import {
  changePageLoading,
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
  const { pageLoading, popularMovies, topRatedMovies, popularMoviesLoading } =
    useSelector(state => state.moviesReducer)
  useEffect(() => {
    const fetchData = async () => {
      dispatch(changePageLoading(true))
      await Promise.all([
        dispatch(getTopRatedMovies()),
        dispatch(getPopularMovies()),
        dispatch(getTopRatedSeries()),
        dispatch(getPopularSeries()),
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
      <Hero />
      <SwiperLayout media={popularMovies} header='Popular Movies' />
      <SwiperLayout media={popularSeries} header='Popular Series' />
      <SwiperLayout media={topRatedMovies} header='Top Rated Movies' />
      <SwiperLayout media={topRatedSeries} header='Top Rated Series' />
    </div>
  )
}

export default Home
