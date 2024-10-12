/* eslint-disable react/prop-types */

import { Typography } from '@material-tailwind/react'
import RadialRatingBar from '../Movies/RadialRatingBar'

const EpisodeCard = ({ episode }) => {
  const poster = episode?.still_path
    ? `https://image.tmdb.org/t/p/w500${episode?.still_path}`
    : `https://via.placeholder.com/500x250?text=No+Image+Available`
  return (
    <div className='flex gap-6 p-4 rounded transition-all hover:bg-blue-gray-500'>
      <img loading='lazy' src={poster} />
      <div className='flex flex-col gap-6'>
        <div className='flex justify-evenly items-center'>
          <Typography variant='h3' className='text-pink-700'>
            {episode?.episode_number || ''} :{episode?.name || ''}
          </Typography>
          {/* Rating */}
          <div className='lg:w-12 lg:h-12 md:w-24 md:h-24'>
            <RadialRatingBar movie={episode} />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <Typography variant='h5' className='text-black dark:text-green-600'>
            Release Date: {episode?.air_date || ''}
          </Typography>
          <Typography variant='h5'>{episode?.overview || ''}</Typography>
        </div>
      </div>
    </div>
  )
}

export default EpisodeCard
