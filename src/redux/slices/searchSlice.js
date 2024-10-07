import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const api = (mediaCategory, query, page = 1) => {
  return {
    method: 'GET',
    url: `${import.meta.env.VITE_BASE_TMDB_URL}/search/${mediaCategory}`,
    params: { query, language: 'en-US', page },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `,
    },
  }
}
export const getSearchedMedia = createAsyncThunk(
  '/getSearchedMedia',
  async ({ mediaType, query, page }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios.request(api(mediaType, query, page))
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)
const initialState = {
  searchedMedia: [],
  searchedMoviesLoading: false,
  searchedMoviesErr: null,
  mediaType: 'movie',
  query: '',
  searchedMoviesPage: 1,
}
const SearchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
      state.searchedMoviesPage = 1
      state.searchedMedia = []
    },
    setMediaType: (state, action) => {
      state.mediaType = action.payload
      state.searchedMoviesPage = 1
      state.searchedMedia = []
    },
    clearSearch: state => {
      state.searchedMedia = []
      state.query = ''
      state.searchedMoviesPage = 1
    },
    searchedLoadMore: state => {
      state.searchedMoviesPage += 1
    },
  },
  extraReducers: builder => {
    // get searched movies
    builder.addCase(getSearchedMedia.pending, state => {
      state.searchedMoviesLoading = true
    })
    builder.addCase(getSearchedMedia.fulfilled, (state, { payload }) => {
      state.searchedMoviesLoading = false
      state.searchedMedia = state.searchedMedia.concat(payload.results)
    })

    builder.addCase(getSearchedMedia.rejected, (state, action) => {
      state.searchedMoviesLoading = false
      state.searchedMoviesErr =
        action.payload?.message || 'something went error'
    })
  },
})
export const searchReducer = SearchSlice.reducer
export const { setQuery, setMediaType, clearSearch, searchedLoadMore } =
  SearchSlice.actions
