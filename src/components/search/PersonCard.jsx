/* eslint-disable react/prop-types */
import { Button } from '@material-tailwind/react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const PersonCard = ({ personData }) => {
  const backgroundImage = personData?.profile_path
    ? `url(https://image.tmdb.org/t/p/w500${personData?.profile_path})`
    : `url(https://via.placeholder.com/500x750?text=No+Image+Available`

  return (
    <Link to={`/person/${personData.id}`}>
      <div
        style={{
          '--image-url': backgroundImage,
        }}
        className={`h-[30rem] bg-[image:var(--image-url)] bg-center bg-cover group  w-full `}
      >
        <Link
          to={`/person/${personData?.id}`}
          className='flex items-center flex-col justify-center h-full w-full'
        >
          <div className='opacity-0 group-hover:opacity-100 group-hover:duration-500 space-x-2 ease-linear transition flex flex-col justify-center items-center  h-full w-full bg-gradient-to-b from-black to-transparent p-6 flex-1'>
            <Button className='flex items-center justify-center bg-red-600 rounded-md shadow-none hover:bg-red-700'>
              <FaPlay className='mr-2' />
              View Details
            </Button>
          </div>
          <div className='h-12 w-full group-hover:duration-500 ease-linear transition group-hover:bg-gradient-to-t from-black to-transparent'>
            <h1 className='text-white text-xl p-4 bg-[rgba(0,0,0,0.5)] w-full text-center'>
              {personData?.name}
            </h1>
          </div>
        </Link>
      </div>
    </Link>
  )
}

export default PersonCard
