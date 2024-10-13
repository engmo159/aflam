/* eslint-disable react/prop-types */

import { Button } from '@material-tailwind/react'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUserReview,
  getUserReview,
  setDeletingReviewsLoading,
} from '../../redux/slices/reviewSlice'
import Loading from '../Loading'
import { changePageLoading } from '../../redux/slices/moviesSlice'

const ReviewCard = ({ review, userProps }) => {
  var newDate = new Date(review.created_at)
  const { deleteReviewErr, isDeletingReview } = useSelector(
    state => state.reviewReducer
  )
  const { token } = useSelector(state => state.tokenReducer)
  const { pageLoading } = useSelector(state => state.moviesReducer)

  const dispatch = useDispatch()
  if (pageLoading) {
    return <Loading load={''} />
  }

  return (
    <div className='flex justify-between items-center hover:bg-gray-5e00 p-4 rounded'>
      <div className='flex gap-3 '>
        <div className='bg-[#9d0a00] text-white min-w-10 h-10 flex justify-center items-center rounded-full'>
          {review.author_details.name
            .match(/(\b\S)?/g)
            .join('')
            .match(/(^\S|\S$)?/g)
            .join('')
            .toUpperCase() ||
            review.author
              .match(/(\b\S)?/g)
              .join('')
              .match(/(^\S|\S$)?/g)
              .join('')
              .toUpperCase()}
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-black dark:text-white text-lg font-semibold'>
            {review.author}
          </span>
          <span className='text-black dark:text-white text-sm'>
            {newDate.toLocaleString('en-US')}
          </span>
          <span className='text-black  dark:text-white text-sm'>
            {review.content}
          </span>
        </div>
      </div>
      {userProps && (
        <>
          {deleteReviewErr && (
            <h1 className='text-red-500'>{deleteReviewErr}</h1>
          )}
          <Button
            color='red'
            onClick={() => {
              dispatch(
                setDeletingReviewsLoading({ index: review?.id, loading: true })
              )
              dispatch(
                deleteUserReview({ token, reviewId: String(review?.id) })
              ).then(() => {
                dispatch(changePageLoading(true))

                dispatch(
                  setDeletingReviewsLoading({
                    index: review?.id,
                    loading: false,
                  })
                )
                dispatch(getUserReview(token))
              })
            }}
          >
            {isDeletingReview[review?.id] ? (
              <span className='btnLoader'></span>
            ) : (
              <div className='flex items-center text-md gap-2'>
                <MdDelete className='text-xl' />
                remove
              </div>
            )}
          </Button>
        </>
      )}
    </div>
  )
}

export default ReviewCard
