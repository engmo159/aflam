import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../Loading'
import { changePageLoading } from '../../redux/slices/moviesSlice'
import { getSeasonsDetails } from '../../redux/slices/mediaDetailsSlice'
import { Typography } from '@material-tailwind/react'
import RadialRatingBar from '../Movies/RadialRatingBar'
import EpisodeCard from './EpisodeCard'

const SeasonDetails = () => {
  const dispatch = useDispatch()
  const { seasonDetails, seasonDetailsLoading, seasonDetailsErr } = useSelector(
    state => state.mediaDetailReducer
  )

  const { mediaType, mediaId, season_number } = useParams()

  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getSeasonsDetails({ season_number, mediaId }))
  }, [mediaId, dispatch])
  const poster = seasonDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w500${seasonDetails?.poster_path}`
    : `https://via.placeholder.com/500x500?text=No+Image+Available`
  const { pageLoading } = useSelector(state => state.moviesReducer)

  if (pageLoading) {
    return <Loading load={seasonDetailsLoading} />
  }
  return (
    <div className='pt-[10%] px-[3%] lg:p-[5%] flex flex-col gap-4 lg:gap-8'>
      {seasonDetailsErr && <h1 className='text-red-900'>seasonDetailsErr</h1>}
      {/* hero  */}
      <div className='flex flex-col-reverse xl:flex-row justify-center  gap-12'>
        <img loading='lazy' src={poster || ''} />
        <div className='flex flex-col gap-2 lg:gap-6'>
          {/* header  */}

          <div className='flex flex-col  lg:gap-6'>
            <Typography variant='h2'>{seasonDetails?.name || ''}</Typography>
            <div className='h-2 w-32 bg-red-900' />
          </div>
          {/* Rating */}
          <div className='lg:w-12 lg:h-12 md:w-10 md:h-10 flex justify-center items-center'>
            <RadialRatingBar movie={seasonDetails} />
          </div>

          <div className='flex flex-col gap-2 lg:gap-4'>
            <Typography variant='h5' className='text-black dark:text-green-600'>
              Release Date: {seasonDetails?.air_date || ''}
            </Typography>
            <Typography variant='h5'>
              {seasonDetails?.overview || ''}
            </Typography>
          </div>
        </div>
      </div>
      {/* episodes  */}

      <div className='flex flex-col gap-4'>
        {/*episode header  */}
        <div className='flex flex-col gap-2'>
          <Typography variant='h2'>Episodes</Typography>
          <div className='h-2 w-32 bg-red-900' />
        </div>
        <div className='flex flex-col gap-4'>
          {seasonDetails?.episodes?.length > 0 &&
            seasonDetails?.episodes.map((episode, index) => (
              <EpisodeCard key={index} episode={episode} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SeasonDetails
