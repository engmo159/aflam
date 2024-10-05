import Hero from '../components/Hero'
import { useSelector } from 'react-redux'
import SwiperLayout from '../components/SwiperLayout'
import Loading from '../components/Loading'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  getPopularMovies,
  getTopRatedMovies,
} from '../redux/slices/moviesSlice'
import {
  getPopularSeries,
  getTopRatedSeries,
} from '../redux/slices/seriesSlice'
const Home = () => {
  return (
    <div>
      <Hero />
      <SwiperLayout />
    </div>
  )
}
export default Home
