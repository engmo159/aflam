import { Button } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { popularLoadMore } from '../../redux/slices/moviesSlice'
import MovieCard from './MovieCard'

const PopularSection = () => {
  const dispatch = useDispatch()
  const {
    popularMovies,
    popularMoviesLoading,
    popularMoviesErr,
    popularMoviesVisible,
  } = useSelector(state => state.moviesReducer)

  if (popularMoviesErr) {
    return <h1>{popularMoviesErr}</h1>
  }

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 items-center justify-center place-content-center'>
      {popularMovies?.slice(0, popularMoviesVisible).map((movie, index) => (
        <MovieCard movie={movie} key={index} mediaType='movie' />
      ))}

      <Button
        onClick={() => dispatch(popularLoadMore())}
        className='flex justify-center lg:col-span-4 md:col-span-2 col-span-1 bg-transparent shadow-none text-ourRed text-md hover:shadow-none rounded-sm font-bold'
      >
        {popularMoviesLoading ? (
          <BarLoader color='red' className='my-2.5' />
        ) : (
          'LOAD MORE'
        )}
      </Button>
    </div>
  )
}

export default PopularSection
