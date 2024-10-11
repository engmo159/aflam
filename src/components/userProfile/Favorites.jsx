import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { useEffect } from 'react'
import { changePageLoading } from '../../redux/slices/moviesSlice'

import { Typography } from '@material-tailwind/react'
import { getFavoriteMedia } from '../../redux/slices/favoriteSlice'
import MovieCard from '../Movies/MovieCard'

const Favorites = () => {
  const { pageLoading } = useSelector(state => state.moviesReducer)
  const { favoriteData, favoriteErr } = useSelector(
    state => state.favoriteReducer
  )
  const { token } = useSelector(state => state.tokenReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePageLoading(true))

    dispatch(getFavoriteMedia(token))
  }, [token])
  if (pageLoading) {
    return <Loading load={''} />
  }

  return (
    <div className='h-screen mx-[5%] pt-[7%]'>
      {favoriteErr && <p className='text-red-600'>{favoriteErr}</p>}
      <div className='flex flex-col gap-2'>
        <Typography
          variant='h4'
          className='uppercase text-black dark:text-white'
        >
          My favorites ({favoriteData?.length})
        </Typography>
        <div className='h-1.5 bg-ourRed w-[10%]' />
      </div>
      {favoriteData?.length > 0 && <MovieCard />}
    </div>
  )
}

export default Favorites
