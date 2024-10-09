/* eslint-disable react/prop-types */
import { Button, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
import RadialRatingBar from './RadialRatingBar'

const MovieCard = ({ movie, mediaType }) => {
  const backgroundImage = movie?.poster_path
    ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
    : `url(https://via.placeholder.com/500x750?text=No+Image+Available)`
  return (
    <div
      style={{
        '--image-url': backgroundImage,
      }}
      className={`h-[30rem] bg-[image:var(--image-url)] bg-center bg-cover group `}
    >
      <Link to={`/${mediaType}/${movie?.id}`}>
        <div className='opacity-0 group-hover:opacity-100 group-hover:duration-500 space-x-2 ease-linear transition flex flex-col justify-center items-center align-middle h-full bg-gradient-to-t from-black to-transparent p-6 '>
          <div className='text-white flex flex-col flex-grow w-full justify-center pt-16 items-center'>
            <Button className='w-fit bg-ourRed rounded-md shadow-none hover:shadow-none hover:bg-red-700'>
              <FaPlay />
            </Button>
          </div>
          <div className="flex flex-col w-full items-start">
            <RadialRatingBar movie={movie} />
            <Typography variant='lead' color='white'>
              {movie?.release_date?.substr(0, 4) ||
                movie?.first_air_date?.substr(0, 4) ||
                ''}
            </Typography>
            <Typography variant='h5' color='white'>
              {movie?.title || movie?.name || ''}
            </Typography>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
