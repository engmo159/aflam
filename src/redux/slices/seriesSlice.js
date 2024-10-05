import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const api = (mediaCategory, page) => {
  return {
    method: 'GET',
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/tv/${mediaCategory}`,
    params: { language: 'en-US', page },
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
export const getPopularSeries = createAsyncThunk(
  '/getPopularSeries',
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(api('popular', page))
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getTopRatedSeries = createAsyncThunk(
  '/getTopRatedSeries',
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(api('top_rated', page))
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

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
  popularSeries: [],
  popularSeriesLoading: true,
  popularSeriesErr: null,
  topRatedSeries: [],
  topRatedSeriesLoading: true,
  topRatedSeriesErr: null,
  //   isItPopular: true,
  //   popularMoviesVisible: 20,
  //   popularMoviesPage: 1,
  //   topRatedMoviesVisible: 20,
  //   topRatedMoviesPage: 1,
  //   genreMovieList: [],
  //   genreLoading: true,
  //   genreErr: null,
}
const SeriesSlice = createSlice({
  name: 'Series',
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
  },
  extraReducers: builder => {
    // get popular series
    builder.addCase(getPopularSeries.pending, state => {
      state.popularSeriesLoading = true
    })
    builder.addCase(getPopularSeries.fulfilled, (state, { payload }) => {
      state.popularSeriesLoading = false
      state.popularSeries = state.popularSeries.concat(payload.results)
    })

    builder.addCase(getPopularSeries.rejected, (state, action) => {
      state.popularSeriesLoading = false
      state.popularSeriesErr = action.payload?.message || 'something went error'
    })

    // get top rated series
    builder.addCase(getTopRatedSeries.pending, state => {
      state.topRatedSeriesLoading = true
    })
    builder.addCase(getTopRatedSeries.fulfilled, (state, action) => {
      state.topRatedSeriesLoading = false
      state.topRatedSeries = state.topRatedSeries.concat(action.payload.results)
    })
    builder.addCase(getTopRatedSeries.rejected, (state, action) => {
      state.topRatedSeriesLoading = false
      state.topRatedSeriesErr =
        action.payload?.message || 'something went error'
    })

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
export const seriesReducer = SeriesSlice.reducer
export const {
  //   changeToPopular,
  //   changeToTopRated,
  //   popularLoadMore,
  //   topRatedLoadMore,
} = SeriesSlice.actions
