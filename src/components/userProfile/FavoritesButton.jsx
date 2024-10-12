/* eslint-disable react/prop-types */
import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  addFavoriteMedia,
  deleteFavoriteMedia,
  getFavoriteMedia,
} from '../../redux/slices/favoriteSlice'

const FavoritesButton = ({ mediaId, mediaType }) => {
  const { token } = useSelector(state => state.tokenReducer)
  const { mediaDetail } = useSelector(state => state.mediaDetailReducer)
  const {
    favoriteLoading,
    addFavoriteLoading,
    deleteFavoriteLoading,
    favoriteData,
  } = useSelector(state => state.favoriteReducer)

  const posterImage = mediaDetail?.poster_path
  const favoriteMediaParams = {
    token,
    mediaType,
    mediaId,
    mediaTitle: mediaDetail?.title || mediaDetail?.name,
    mediaPoster: posterImage,
    mediaRate: Math.round(mediaDetail?.vote_average * 10) / 10,
  }

  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(false)

  // Initialize isFavorite state
  useEffect(() => {
    if (mediaDetail && Array.isArray(favoriteData)) {
      const isFav = favoriteData.some(
        favorite => favorite.mediaId === String(mediaDetail.id)
      )
      setIsFavorite(isFav)
    }
  }, [mediaDetail, favoriteData])

  // Get favorite media at mount
  useEffect(() => {
    if (token) {
      dispatch(getFavoriteMedia(token))
    }
  }, [dispatch, token])

  const handleFavoriteToggle = async () => {
    const favorite = favoriteData?.find(
      favoriteOne => favoriteOne.mediaId === mediaId
    )

    try {
      if (favorite && isFavorite) {
        await dispatch(deleteFavoriteMedia({ token, favoriteId: favorite.id }))
        setIsFavorite(false)
      } else {
        await dispatch(addFavoriteMedia(favoriteMediaParams))
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Failed to update favorite:', error)
    }
  }

  return (
    <button
      className='flex w-max gap-2 items-center justify-center font-normal text-red-800'
      onClick={handleFavoriteToggle} // No need for arrow function here
    >
      {addFavoriteLoading || deleteFavoriteLoading || favoriteLoading ? (
        <span className='btnLoader'></span>
      ) : isFavorite ? (
        <FaHeart className='lg:text-2xl text-4xl text-ourRed' />
      ) : (
        <FaRegHeart className='lg:text-2xl text-4xl text-ourRed' />
      )}
    </button>
  )
}

export default FavoritesButton
