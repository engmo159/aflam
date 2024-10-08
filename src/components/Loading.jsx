/* eslint-disable react/prop-types */
import { BarLoader } from 'react-spinners'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePageLoading } from '../redux/slices/moviesSlice'

const Loading = ({ load }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const dispatch = useDispatch()
  const { pageLoading } = useSelector(state => state.moviesReducer)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => dispatch(changePageLoading(false)), 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    (pageLoading || load) && (
      <div className='flex flex-col pt-14 justify-between items-center h-screen '>
        <BarLoader color='red' width={width / 1.1} />
        <div className='h-full flex justify-center items-center'>
          <span className='mr-4 cursor-pointer py-1.5 font-bold text-4xl text-black dark:text-white'>
            Redux <span className='text-red-500'>Movies</span>
          </span>
        </div>
      </div>
    )
  )
}

export default Loading
