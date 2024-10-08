import MediaHero from '../components/mediaDetails/MediaHero'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import {
  getCreditDetails,
  getMediaDetails,
} from '../redux/slices/mediaDetailsSlice'
import { changePageLoading } from '../redux/slices/moviesSlice'
import Loading from '../components/Loading'
const MediaDetails = () => {
  const dispatch = useDispatch()
  const { mediaDetail, mediaDetailLoading } = useSelector(
    state => state.mediaDetailReducer
  )
  const { mediaType, mediaId } = useParams()
  const { pageLoading } = useSelector(state => state.moviesReducer)
  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getMediaDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getCreditDetails({ mediaCategory: mediaType, mediaId }))
  }, [mediaId, mediaType, dispatch])
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
