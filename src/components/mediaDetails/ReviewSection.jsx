import { Typography } from '@material-tailwind/react'

const ReviewSection = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Typography
          variant='h4'
          className='uppercase text-black dark:text-white'
        >
          Reviews
        </Typography>
        <div className='h-1.5 bg-ourRed w-24' />
      </div>
    </div>
  )
}

export default ReviewSection
