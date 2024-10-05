import { useSelector } from 'react-redux'
import Hero from '../components/Hero'
import MoviesSection from '../components/Movies/MoviesSection'
import Loading from '../components/Loading'

const Movies = () => {
  const { pageLoading } = useSelector(state => state.moviesReducer)

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
  )
}

export default Movies
