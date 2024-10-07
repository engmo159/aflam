/* eslint-disable react/prop-types */

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Button } from '@material-tailwind/react'
import { BiSolidRightArrow } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMediaDetails } from '../../redux/slices/mediaDetailsSlice'

const MediaHero = ({ displayedItems, genre }) => {
  const dispatch = useDispatch()
  const { mediaDetail } = useSelector(state => state.mediaDetailReducer)
  useEffect(() => {
    dispatch(getMediaDetails())
  }, [])
  return (
    <div className='relative h-screen overflow-hidden'>
      {displayedItems?.map((movie, index) => (
        <div key={index}>
          <div
            className='h-full w-full bg-center bg-no-repeat flex items-center justify-center'
            style={{
              backgroundImage: `url(${
                import.meta.env.VITE_BASE_TMDB_POSTER_PATH
              }${movie?.backdrop_path || movie?.poster_path})`,
              backgroundSize: 'cover',
            }}
          />
          <div className='z-50 absolute inset-0 flex flex-col justify-center pl-[10%] w-1/2 gap-10'>
            {/* title  */}
            <h1 className=' text-white text-7xl font-bold'>
              {movie?.title || movie?.name}
            </h1>
            <div className='flex gap-4 items-center'>
              {/* rate */}
              <div className='w-12 h-12'>
                <CircularProgressbar
                  value={movie?.vote_average.toFixed(1) * 10}
                  text={`${movie?.vote_average.toFixed(1)}`}
                  styles={buildStyles({
                    textColor: 'white',
                    pathColor: 'green',
                    trailColor: 'transparent',
                  })}
                />
              </div>
              {/* genre  */}
              <div className='flex gap-2'>
                {movie.genre_ids
                  .map(genreId => genre?.find(g => g.id === genreId)?.name)
                  .splice(0, 2)
                  .map((genreName, index) => (
                    <p
                      key={index}
                      color='red'
                      className='text-sm font-normal bg-red-800 p-2 rounded-xl'
                    >
                      {genreName || ''}
                    </p>
                  ))}
              </div>
            </div>
            {/* overview  */}
            <p>{movie?.overview}</p>
            {/* button  */}
            <Button
              color='red'
              className='flex w-max gap-2 text-md items-center justify-center font-normal'
            >
              <BiSolidRightArrow />
              Watch Now
            </Button>
          </div>
          <div className='absolute z-10 inset-0 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none' />
        </div>
      ))}
    </div>
  )
}

export default MediaHero
