import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../Movies/MovieCard'
import { Button } from '@material-tailwind/react'
import { creditsLoadMore } from '../../redux/slices/personDetailsSlice'
import { BarLoader } from 'react-spinners'

const CombinedCredits = () => {
  const dispatch = useDispatch()
  const { personCredits, personCreditsVisible, personCreditsLoading } =
    useSelector(state => state.personDetailsReducer)

  return (
    <div className='flex flex-col gap-8 lg:px-20 py-5 h-full overflow-hidden'>
      <div className='flex flex-col gap-1 '>
        <h1 className='font-bold text-3xl'>Credits</h1>
        <hr className='w-28 border-[3px] border-red-600 ' />
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 items-center justify-center place-content-center'>
        {personCredits.length &&
          personCredits
            ?.slice(0, personCreditsVisible)
            .map((movie, index) => (
              <MovieCard movie={movie} key={index} mediaType='movie' />
            ))}
        <Button
          onClick={() => dispatch(creditsLoadMore())}
          className='flex justify-center lg:col-span-4 md:col-span-2 col-span-1 bg-transparent shadow-none text-red-600 text-md hover:shadow-none rounded-sm font-bold'
        >
          {personCreditsLoading ? (
            <BarLoader color='red' className='my-2.5' />
          ) : (
            'LOAD MORE'
          )}
        </Button>
      </div>
    </div>
  )
}

export default CombinedCredits
