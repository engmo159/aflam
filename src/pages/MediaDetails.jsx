import MediaHero from '../components/mediaDetails/MediaHero'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import {
  getCreditDetails,
  getMediaDetails,
} from '../redux/slices/mediaDetailsSlice'
const MediaDetails = () => {
  const dispatch = useDispatch()
  const { mediaDetail } = useSelector(state => state.mediaDetailReducer)
  const { mediaType, mediaId } = useParams()

  useEffect(() => {
    dispatch(getMediaDetails({ mediaCategory: mediaType, mediaId }))
    dispatch(getCreditDetails({ mediaCategory: mediaType, mediaId }))
  }, [mediaId, mediaType, dispatch])
  return (
    <div>
      <MediaHero />
    </div>
  )
}

export default MediaDetails
