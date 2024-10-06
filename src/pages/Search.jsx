import { Button, Input } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSearch,
  getSearchedMedia,
  setMediaType,
  setQuery,
} from '../redux/slices/searchSlice'
import SearchedMedia from '../components/search/SearchedMedia'
import { useEffect } from 'react'

const Search = () => {
  const mediaCategories = ['movie', 'tv', 'person']
  const dispatch = useDispatch()
  const { mediaType, searchedMoviesPage, query } = useSelector(
    state => state.searchReducer
  )
  let timer = null
  const searchHandler = (value, type) => {
    if (value.trim().length > 0) {
      dispatch(
        getSearchedMedia({
          query: value,
          mediaType: type,
          page: searchedMoviesPage,
        })
      )
    } else {
      dispatch(clearSearch())
    }
  }
  const handleInputChange = val => {
    dispatch(setQuery(val))
    clearTimeout(timer)
    timer = setTimeout(() => {
      searchHandler(val, mediaType)
    }, 300)
  }
  useEffect(() => {
    clearTimeout(timer)
  }, [])

  return (
    <div className='w-full min-h-screen'>
      <div className=' xl:px-24 xl:pt-24 xl:pb-12 flex flex-col gap-12 items-center'>
        <div className='flex justify-center gap-12'>
          {mediaCategories.map((category, index) => (
            <Button
              key={index}
              className='uppercase text-md'
              variant={category == mediaType ? 'filled' : 'text'}
              color='red'
              onClick={() => {
                dispatch(setMediaType(category))
                searchHandler(query, category)
              }}
              size='sm'
            >
              {category}
            </Button>
          ))}
        </div>
        <Input
          size='lg'
          color='teal'
          label={`Search Your Favorite ${mediaType}`}
          autoFocus
          className='!text-4xl py-8 border outline outline-2 outline-teal-800 border-teal-800 hover:border-white hover:outline-white transition-all'
          onChange={e => handleInputChange(e.target.value)}
          value={query}
        />
      </div>
      <SearchedMedia />
    </div>
  )
}

export default Search
