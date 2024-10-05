import { useDispatch, useSelector } from 'react-redux'
import Hero from '../components/Hero'
import MoviesSection from '../components/Movies/MoviesSection'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import { changePageLoading } from '../redux/slices/moviesSlice'

const Movies = () => {
  const { pageLoading, popularMoviesLoading } = useSelector(
    state => state.moviesReducer
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePageLoading(true))
  }, [])
  if (pageLoading) {
    return <Loading load={popularMoviesLoading} />
  }

  return (
    <div>
      <Hero />
      <MoviesSection />
    </div>
  )
}

export default Movies
