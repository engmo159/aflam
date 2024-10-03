import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const api = (mediaCategory = 'popular', pageNumber = 1) => {
  return {
    method: 'GET',
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/movie/${mediaCategory}`,
    params: { language: 'en-US', page: `${pageNumber}` },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}
const genreApi = () => {
  return {
    method: 'GET',
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/genre/movie/list`,
    params: { language: 'en' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}
export const getPopularMovies = createAsyncThunk(
  '/getPopularMovies',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(api())
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
export const getGenreMoviesList = createAsyncThunk(
  '/getGenreMoviesList',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(genreApi())
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const initialState = {
  popularMovies: [],
  loading: true,
  err: null,
  genreMovieList: [],
  genreLoading: true,
  genreErr: null,
}
const MoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // get popular movies
    builder.addCase(getPopularMovies.pending, state => {
      state.loading = true
    })
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      state.loading = false
      state.popularMovies = action.payload.results
    })

    builder.addCase(getPopularMovies.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload?.message || 'something went error'
    })
    // get genre list movies
    builder.addCase(getGenreMoviesList.pending, state => {
      state.genreLoading = true
    })
    builder.addCase(getGenreMoviesList.fulfilled, (state, action) => {
      state.genreLoading = false
      state.genreMovieList = action.payload.genres
    })

    builder.addCase(getGenreMoviesList.rejected, (state, action) => {
      state.genreLoading = false
      state.genreErr = action.payload?.message || 'something went error'
    })
  },
})
export const moviesReducer = MoviesSlice.reducer
