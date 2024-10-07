import { useDispatch, useSelector } from 'react-redux'
import Hero from '../components/Hero'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import { changePageLoading } from '../redux/slices/moviesSlice'
import { getPopularSeries } from '../redux/slices/seriesSlice'
import SeriesSection from '../components/series/SeriesSection'

const Tv = () => {
  const dispatch = useDispatch()
  const {
    popularSeries,
    genreSeriesList,
    popularSeriesLoading,
    popularSeriesPage,
  } = useSelector(state => state.seriesReducer)

  const { pageLoading } = useSelector(state => state.moviesReducer)

  useEffect(() => {
    dispatch(changePageLoading(true))
  }, [])

  useEffect(() => {
    dispatch(getPopularSeries(popularSeriesPage))
  }, [popularSeriesPage])

  if (pageLoading) {
    return <Loading load={popularSeriesLoading} />
  }

  return (
    <div>
      <Hero
        displayedItems={popularSeries}
        genre={genreSeriesList}
        mediaType='tv'
      />
      <SeriesSection />
    </div>
  )
}

export default Tv
