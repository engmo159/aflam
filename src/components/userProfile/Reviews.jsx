import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { useEffect } from 'react'
import { changePageLoading } from '../../redux/slices/moviesSlice'
import { Typography } from '@material-tailwind/react'
import { getUserReview } from '../../redux/slices/reviewSlice'
import ReviewCardPage from './ReviewCardPage'
const Reviews = () => {
  const { pageLoading } = useSelector(state => state.moviesReducer)
  const { getReviewErr, reviewData } = useSelector(state => state.reviewReducer)
  const { token } = useSelector(state => state.tokenReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getUserReview(token))
  }, [token])

  if (pageLoading) {
    return <Loading load={''} />
  }

  return (
    <div className='min-h-screen mx-[5%] py-[7%] flex flex-col gap-8'>
      {getReviewErr && <p className='text-red-600'>{getReviewErr}</p>}
      <div className='flex flex-col gap-2'>
        <Typography
          variant='h4'
          className='uppercase text-black dark:text-white'
        >
          My reviews ({reviewData?.length})
        </Typography>
        <div className='h-1.5 bg-ourRed w-[10%]' />
      </div>
      {reviewData?.length > 0 && (
        <div className='flex flex-col gap-4'>
          {reviewData?.map((data, index) => (
            <ReviewCardPage key={index} data={data} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews
