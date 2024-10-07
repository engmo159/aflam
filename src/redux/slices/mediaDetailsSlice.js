import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const api = (mediaCategory, mediaId) => {
  return {
    method: 'GET',
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/${mediaCategory}/${mediaId}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}
// const genreApi = () => {
//   return {
//     method: 'GET',
//     url: `${import.meta.env.VITE_BASE_TMDB_URL}/genre/movie/list`,
//     params: { language: 'en' },
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
//     },
//   }
// }
export const getMediaDetails = createAsyncThunk(
  '/getMediaDetails',
  async ({ mediaCategory, mediaId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(api({ mediaCategory, mediaId }))
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

// export const getTopRatedMovies = createAsyncThunk(
//   '/getTopRatedMovies',
//   async (page, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//       const { data } = await axios.request(api('top_rated', page))
//       return data
//     } catch (e) {
//       return rejectWithValue(e)
//     }
//   }
// )

// export const getGenreMoviesList = createAsyncThunk(
//   '/getGenreMoviesList',
//   async (id, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//       const { data } = await axios.request(genreApi())
//       return data
//     } catch (e) {
//       return rejectWithValue(e)
//     }
//   }
// )

const initialState = {
  mediaDetail: {},
  mediaDetailLoading: false,
  mediaDetailErr: null,
  //   topRatedMovies: [],
  //   topRatedMoviesLoading: true,
  //   topRatedMoviesErr: null,
  //   isItPopular: true,
  //   popularMoviesVisible: 20,
  //   popularMoviesPage: 1,
  //   topRatedMoviesVisible: 20,
  //   topRatedMoviesPage: 1,
  //   genreMovieList: [],
  //   genreLoading: true,
  //   genreErr: null,
  //   pageLoading: true,
}
const mediaDetailsSlice = createSlice({
  name: 'mediaDetails',
  initialState,
  reducers: {
    // changeToPopular: state => {
    //   state.isItPopular = true
    // },
    // changeToTopRated: state => {
    //   state.isItPopular = false
    // },
    // popularLoadMore: state => {
    //   state.popularMoviesVisible += 20
    //   state.popularMoviesPage += 1
    // },
    // topRatedLoadMore: state => {
    //   state.topRatedMoviesVisible += 20
    //   state.topRatedMoviesPage += 1
    // },
    // changePageLoading: (state, action) => {
    //   state.pageLoading = action.payload
    // },
  },
  extraReducers: builder => {
    // get media detail
    builder.addCase(getMediaDetails.pending, state => {
      state.mediaDetailLoading = true
    })
    builder.addCase(getMediaDetails.fulfilled, (state, { payload }) => {
      state.mediaDetailLoading = false
      state.mediaDetail = payload.results
    })
    builder.addCase(getMediaDetails.rejected, (state, action) => {
      state.mediaDetailLoading = false
      state.mediaDetailErr = action.payload?.message || 'something went error'
    })
    // get top rated movies
    // builder.addCase(getTopRatedMovies.pending, state => {
    //   state.topRatedMoviesLoading = true
    // })
    // builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
    //   state.topRatedMoviesLoading = false
    //   state.topRatedMovies = state.topRatedMovies.concat(action.payload.results)
    // })
    // builder.addCase(getTopRatedMovies.rejected, (state, action) => {
    //   state.topRatedMoviesLoading = false
    //   state.topRatedMoviesErr =
    //     action.payload?.message || 'something went error'
    // })
    // get genre list movies
    // builder.addCase(getGenreMoviesList.pending, state => {
    //   state.genreLoading = true
    // })
    // builder.addCase(getGenreMoviesList.fulfilled, (state, action) => {
    //   state.genreLoading = false
    //   state.genreMovieList = action.payload.genres
    // })
    // builder.addCase(getGenreMoviesList.rejected, (state, action) => {
    //   state.genreLoading = false
    //   state.genreErr = action.payload?.message || 'something went error'
    // })
  },
})
export const mediaDetailReducer = mediaDetailsSlice.reducer
export const {
  //   changeToPopular,
  //   changeToTopRated,
  //   popularLoadMore,
  //   topRatedLoadMore,
  //   changePageLoading,
} = mediaDetailsSlice.actions
