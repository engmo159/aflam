import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading'
import { useEffect } from 'react'
import { changePageLoading } from '../../redux/slices/moviesSlice'
import { Button, Typography } from '@material-tailwind/react'
import {
  deleteFavoriteMedia,
  getFavoriteMedia,
  setDeletingFavoritesLoading,
} from '../../redux/slices/favoriteSlice'
import MovieCard from '../Movies/MovieCard'
import { MdDelete } from 'react-icons/md'

const Favorites = () => {
  const { pageLoading } = useSelector(state => state.moviesReducer)
  const { favoriteData, favoriteErr, isDeletingFavorites } = useSelector(
    state => state.favoriteReducer
  )
  const { token } = useSelector(state => state.tokenReducer)


  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(changePageLoading(true))
    dispatch(getFavoriteMedia(token))
  }, [token])

  if (pageLoading) {
    return <Loading load={""} />;
  }

  return (
    <div className='min-h-screen mx-[5%] py-[7%] flex flex-col gap-8'>
      {favoriteErr && <p className='text-red-600'>{favoriteErr}</p>}
      <div className='flex flex-col gap-2'>
        <Typography
          variant="h4"
          className="uppercase text-black dark:text-white">
          My favorites ({favoriteData?.length ? favoriteData?.length : 0})
        </Typography>
        <div className="h-1.5 bg-ourRed w-[10%]" />
      </div>
      {favoriteData?.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'>
          {favoriteData.map((data, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <MovieCard
                movie={{
                  poster_path: data?.mediaPoster,
                  id: data?.mediaId,
                  title: data?.mediaTitle,
                  vote_average: data?.mediaRate,
                }}
                mediaType={data.mediaType}
              />
              <Button
                color='red'
                fullWidth
                className='text-md flex justify-center items-center gap-4 py-2'
                onClick={() => {
                  dispatch(
                    setDeletingFavoritesLoading({ index, loading: true })
                  )
                  dispatch(deleteFavoriteMedia({ token, favoriteId: data.id }))
                    .then(() =>
                      dispatch(
                        setDeletingFavoritesLoading({ index, loading: false })
                      )
                    )
                    .then(() => {
                      dispatch(getFavoriteMedia(token))
                      dispatch(changePageLoading(true))
                    })
                }}
              >
                {isDeletingFavorites[index] ? (
                  <span className='btnLoader'></span>
                ) : (
                  <>
                    <MdDelete className='text-lg' />
                    Remove
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
