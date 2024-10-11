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

const initialState = {
  favoriteData: null,
  favoriteLoading: false,
  favoriteErr: null,
  favoriteToastState: false,
}
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
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
  },
})
export const favoriteReducer = favoriteSlice.reducer
// export const {} = favoriteSlice.actions
