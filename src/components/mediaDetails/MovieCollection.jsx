import { useDispatch, useSelector } from 'react-redux'
import SwiperLayout from '../SwiperLayout'
import { useEffect } from 'react'
import { getCollectionDetails } from '../../redux/slices/mediaDetailsSlice'

const MovieCollection = () => {
  const { mediaDetail, collectionDetails } = useSelector(
    state => state.mediaDetailReducer
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getCollectionDetails({
        collection_id: mediaDetail?.belongs_to_collection?.id,
      })
    )
  }, [mediaDetail])
  return (
    <div className='-px-2'>
      <SwiperLayout
        media={collectionDetails.parts}
        mediaType='movie'
        header={mediaDetail?.belongs_to_collection?.name}
        collectionStyle
      />
    </div>
  )
}

export default MovieCollection
