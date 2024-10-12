/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-tailwind/react'
import { FaLocationArrow } from 'react-icons/fa6'
import { addUserReview } from '../../redux/slices/reviewSlice'

const AddReview = ({ mediaType }) => {
  const { userData } = useSelector(state => state.userAuthReducer)
  const { addReviewLoading } = useSelector(state => state.reviewReducer)
  const { token } = useSelector(state => state.tokenReducer)
  const { mediaDetail } = useSelector(state => state.mediaDetailReducer)
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const submitHandler = () => {
    if (!content.trim()) {
      alert('Please enter a review.')
      return
    }
    if (mediaDetail && mediaType) {
      const data = {
        token,
        content,
        mediaType,
        mediaId: mediaDetail?.id,
        mediaTitle: mediaDetail?.original_title || mediaDetail?.name,
        mediaPoster: mediaDetail?.poster_path,
        mediaRate: mediaDetail?.vote_average,
      }
      dispatch(addUserReview(data)).then(() => setContent(''))
    }
  }
  return (
    <div className='flex flex-col gap-6'>
      {/* user name  */}
      <div className='flex gap-3 items-center'>
        <div className='bg-[#9d0a00] text-white min-w-10 h-10 flex justify-center items-center rounded-full'>
          {userData?.displayName
            .match(/(\b\S)?/g)
            .join('')
            .match(/(^\S|\S$)?/g)
            .join('')
            .toUpperCase() || ''}
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-black dark:text-white text-lg font-semibold'>
            {userData?.displayName}
          </span>
        </div>
      </div>
      {/* text aria and button */}
      <div className='lg:mx-[3%] flex flex-col gap-3'>
        {/* text aria  */}
        <div className='relative w-full min-w-[150px]'>
          <textarea
            className='peer h-full min-h-[150px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
            onChange={e => setContent(e.target.value)}
            value={content}
          ></textarea>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 ">
            Write Your Review
          </label>
        </div>

        {/* post button  */}

        <Button
          color='red'
          className='w-fit text-md'
          onClick={() => submitHandler()}
        >
          <div className='flex gap-2 items-center font-normal'>
            {addReviewLoading ? (
              <span className='btnLoader'></span>
            ) : (
              <>
                <FaLocationArrow className='text-xl' />
                Post
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  )
}

export default AddReview
