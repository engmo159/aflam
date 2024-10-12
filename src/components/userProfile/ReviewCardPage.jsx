import { Button, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserReview,
  getUserReview,
  setDeletingReviewsLoading,
} from '../../redux/slices/reviewSlice'
import { changePageLoading } from '../../redux/slices/moviesSlice'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

/* eslint-disable react/prop-types */
const ReviewCardPage = ({ data }) => {
  const newDate = new Date(data?.createdAt)
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.tokenReducer)
  const { reviewData, isDeletingReview } = useSelector(
    state => state.reviewReducer
  )

  const index = reviewData.findIndex(review => review?.id === data?.id)

  const handleDelete = async () => {
    dispatch(setDeletingReviewsLoading({ index, loading: true }))
    try {
      await dispatch(deleteUserReview({ token, reviewId: data.id })).unwrap()
      dispatch(getUserReview(token))
      dispatch(changePageLoading(true))
    } catch (error) {
      console.error('Delete operation failed:', error)
    } finally {
      dispatch(setDeletingReviewsLoading({ index, loading: false }))
    }
  }

  return (
    <div className='flex justify-around items-start hover:bg-gray-900 rounded py-4 group'>
      <Link to={`/${data?.mediaType}/${data?.mediaId}`}>
        <div className=' flex gap-8'>
          <img
            className='h-72'
            src={
              data?.mediaPoster
                ? `https://image.tmdb.org/t/p/w500${data?.mediaPoster}`
                : `https://via.placeholder.com/500x750?text=No+Image+Available`
            }
            alt={data?.mediaTitle || 'No Image'}
          />

          <div className='flex flex-col gap-2 group-hover:text-white'>
            <Typography variant='h5'>{data?.mediaTitle}</Typography>
            <span className='text-black dark:text-white text-sm group-hover:text-white'>
              {newDate.toLocaleString('en-US')}
            </span>
            <Typography variant='h5'>{data?.content}</Typography>
          </div>
        </div>
      </Link>
      <Button
        color='red'
        className='text-md flex justify-center items-center gap-4 py-2'
        onClick={handleDelete}
      >
        {isDeletingReview[index] ? (
          <span className='btnLoader'></span>
        ) : (
          <>
            <MdDelete className='text-lg' />
            Remove
          </>
        )}
      </Button>
    </div>
  )
}

export default ReviewCardPage
