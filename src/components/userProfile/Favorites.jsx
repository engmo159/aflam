import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { useEffect } from 'react'
import { changePageLoading } from '../../redux/slices/moviesSlice'

const Favorites = () => {
  const { pageLoading } = useSelector(state => state.moviesReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePageLoading(true))
  }, [])
  if (pageLoading) {
    return <Loading load={''} />
  }

  return <div className='h-screen'>Favorites</div>
}

export default Favorites
