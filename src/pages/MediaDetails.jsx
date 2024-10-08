import MediaHero from '../components/mediaDetails/MediaHero'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import {
  getCreditDetails,
  getMediaDetails,
} from '../redux/slices/mediaDetailsSlice'

import Loading from '../components/Loading'
import { changePageLoading } from '../redux/slices/moviesSlice'
const MediaDetails = () => {
  const dispatch = useDispatch()
  const { mediaDetail, mediaDetailLoading } = useSelector(
    state => state.mediaDetailReducer
  )
  const { mediaType, mediaId } = useParams()

  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getMediaDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getCreditDetails({ mediaCategory: mediaType, mediaId }))
  }, [mediaId, mediaType, dispatch])

  const { pageLoading } = useSelector(state => state.moviesReducer)

  if (pageLoading) {
    return <Loading load={mediaDetailLoading} />
  }
  return (
    <div>
      <MediaHero />
    </div>
  )
}

export default MediaDetails
