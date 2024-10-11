import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getFavoriteMedia = createAsyncThunk(
  'getFavoriteMedia',
  async (token, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.get('/user/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response?.data || 'Fetch user info failed')
    }
  }
)

export const addFavoriteMedia = createAsyncThunk(
  'addFavoriteMedia',
  async (
    { token, mediaType, mediaId, mediaTitle, mediaPoster, mediaRate },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.post(
        '/user/favorites',
        { mediaType, mediaId, mediaTitle, mediaPoster, mediaRate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data
    } catch (e) {
      return rejectWithValue(e.response?.data || 'Add to favorites failed')
    }
  }
)
export const deleteFavoriteMedia = createAsyncThunk(
  'deleteFavoriteMedia',
  async ({ token, favoriteId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.delete(`/user/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response?.data || 'Delete favorites failed')
    }
  }
)

const initialState = {
  favoriteData: [],
  favoriteLoading: false,
  favoriteErr: null,
  favoriteToastState: false,
  addFavoriteLoading: false,
  addFavoriteErr: null,
  addFavoriteToastState: false,
  deleteFavoriteLoading: false,
  deleteFavoriteErr: null,
  deleteFavoriteToastState: false,
  isDeletingFavorites: [],
}
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setDeletingFavoritesLoading(state, action) {
      const { index, loading } = action.payload
      state.isDeletingFavorites[index] = loading
    },
  },
  extraReducers: builder => {
    // get user favorite
    builder.addCase(getFavoriteMedia.pending, state => {
      state.favoriteLoading = true
      state.favoriteErr = null
      state.favoriteData = null
      state.favoriteToastState = false
    })
    builder.addCase(getFavoriteMedia.fulfilled, (state, action) => {
      state.favoriteLoading = false
      state.favoriteData = action?.payload
      state.favoriteToastState = true
    })

    builder.addCase(getFavoriteMedia.rejected, (state, action) => {
      state.favoriteLoading = false
      state.favoriteToastState = false
      state.favoriteErr = action.payload.message || 'something went error'
    })
    //adding to favorites
    builder.addCase(addFavoriteMedia.pending, state => {
      state.addFavoriteLoading = true
      state.addFavoriteErr = null
      state.addFavoriteToastState = false
    })
    builder.addCase(addFavoriteMedia.fulfilled, (state, action) => {
      state.addFavoriteLoading = false
      state.favoriteData = action.payload
      state.addFavoriteToastState = true
    })
    builder.addCase(addFavoriteMedia.rejected, (state, action) => {
      state.addFavoriteLoading = false
      state.addFavoriteToastState = false
      state.addFavoriteErr = action.payload.message || 'Something went wrong'
    })
    //delete favorites
    builder.addCase(deleteFavoriteMedia.pending, state => {
      state.deleteFavoriteLoading = true
      state.deleteFavoriteErr = null
      state.deleteFavoriteToastState = false
    })
    builder.addCase(deleteFavoriteMedia.fulfilled, state => {
      state.deleteFavoriteLoading = false
      //   state.favoriteData = action.payload
      state.deleteFavoriteToastState = true
    })
    builder.addCase(deleteFavoriteMedia.rejected, (state, action) => {
      state.deleteFavoriteLoading = false
      state.deleteFavoriteToastState = false
      state.deleteFavoriteErr = action.payload.message || 'Something went wrong'
    })
  },
})
export const favoriteReducer = favoriteSlice.reducer
export const { setDeletingFavoritesLoading } = favoriteSlice.actions
