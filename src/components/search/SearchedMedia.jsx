import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../Movies/MovieCard'
import { Button } from '@material-tailwind/react'
import {
  getSearchedMedia,
  searchedLoadMore,
} from '../../redux/slices/searchSlice'
import { BarLoader } from 'react-spinners'
import PersonCard from './PersonCard'

const SearchedMedia = () => {
  const dispatch = useDispatch()
  const {
    searchedMedia,
    searchedMoviesLoading,
    mediaType,
    searchedMoviesPage,
    query,
  } = useSelector(state => state.searchReducer)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8'>
      {searchedMedia?.map((data, index) => (
        <div key={index} className='w-full'>
          {mediaType === 'person' ? (
            <PersonCard personData={data} />
          ) : (
            <MovieCard movie={data} mediaType={mediaType} />
          )}
        </div>
      ))}
      {searchedMedia.length > 0 && (
        <Button
          onClick={() => {
            dispatch(searchedLoadMore())
            dispatch(
              getSearchedMedia({
                mediaType,
                query,
                page: searchedMoviesPage,
              })
            )
          }}
          className='flex justify-center lg:col-span-4 md:col-span-2 col-span-1 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold'
        >
          {searchedMoviesLoading ? (
            <BarLoader color='red' className='my-2.5' />
          ) : (
            'LOAD MORE'
          )}
        </Button>
      )}
    </div>
  )
}

export default SearchedMedia
