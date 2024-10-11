/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'

const RadialRatingBar = ({ movie }) => {
  const { theme } = useSelector(state => state.themeReducer)
  return (
    <div className='relative w-14 md-w-2 h-14 '>
      <svg className='w-full h-full' viewBox='0 0 100 100'>
        <circle
          className='text-transparent stroke-current'
          strokeWidth='10'
          cx='50'
          cy='50'
          r='40'
          fill='transparent'
        ></circle>

        <circle
          className='text-[#66BB6A]  progress-ring__circle stroke-current'
          strokeWidth='10'
          strokeLinecap='round'
          cx='50'
          cy='50'
          r='40'
          fill='transparent'
          strokeDasharray='251.2'
          strokeDashoffset={`calc(251.2px - (251.2px * ${Math.round(
            movie?.vote_average * 10
          )}) / 100)`}
        ></circle>

        <text
          x='50'
          y='50'
          fill={theme == 'dark' ? 'white' : 'black'}
          fontSize='25'
          fontWeight={'bold'}
          textAnchor='middle'
          alignmentBaseline='middle'
        >
          {Math.round(movie?.vote_average * 10) / 10}
        </text>
      </svg>
    </div>
  )
}

export default RadialRatingBar
