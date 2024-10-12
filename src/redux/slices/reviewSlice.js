import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getUserReview = createAsyncThunk(
  'getUserReview',
  async (token, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.get('/reviews', {
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

export const addUserReview = createAsyncThunk(
  'addUserReview',
  async (
    { token, mediaType, mediaId, mediaTitle, mediaPoster, content, mediaRate },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.post(
        '/reviews',
        { mediaType, mediaId, mediaTitle, mediaPoster, content, mediaRate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data
    } catch (e) {
      return rejectWithValue(e.response?.data || 'Add review failed')
    }
  }
)
export const deleteUserReview = createAsyncThunk(
  'deleteUserReview',
  async ({ token, reviewId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    } catch (e) {
      return rejectWithValue(e.response?.data || 'Delete review failed')
    }
  }
)

const initialState = {
  reviewData: [],
  getReviewLoading: false,
  getReviewErr: null,
  addReviewLoading: false,
  addReviewErr: null,
  deleteReviewLoading: false,
  deleteReviewErr: null,
  isDeletingReview: [],
}
const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setDeletingReviewsLoading(state, action) {
      const { index, loading } = action.payload
      state.isDeletingReview[index] = loading
    },
    setReviews(state, action) {
      state.reviewData = action.payload
      state.isDeletingReview = new Array(action.payload.length).fill(false)
    },
  },
  extraReducers: builder => {
    // get user reviews
    builder.addCase(getUserReview.pending, state => {
      state.getReviewLoading = true
      state.getReviewErr = null
      state.reviewData = null
    })
    builder.addCase(getUserReview.fulfilled, (state, action) => {
      state.getReviewLoading = false
      state.reviewData = action?.payload
    })

    builder.addCase(getUserReview.rejected, (state, action) => {
      state.getReviewLoading = false
      state.getReviewErr = action.payload.message || 'something went error'
    })
    //adding to reviews
    builder.addCase(addUserReview.pending, state => {
      state.addReviewLoading = true
      state.addReviewErr = null
    })
    builder.addCase(addUserReview.fulfilled, (state, action) => {
      state.addReviewLoading = false
      state.reviewData = state.reviewData.concat(action.payload)
    })
    builder.addCase(addUserReview.rejected, (state, action) => {
      state.addReviewLoading = false
      state.addReviewErr = action.payload.message || 'Something went wrong'
    })
    //delete favorites
    builder.addCase(deleteUserReview.pending, state => {
      state.deleteReviewLoading = true
      state.deleteReviewErr = null
    })
    builder.addCase(deleteUserReview.fulfilled, state => {
      state.deleteReviewLoading = false
      //   state.favoriteData = action.payload
    })
    builder.addCase(deleteUserReview.rejected, (state, action) => {
      state.deleteReviewLoading = false
      state.deleteReviewErr = action.payload.message || 'Something went wrong'
    })
  },
})
export const reviewReducer = reviewSlice.reducer
export const { setDeletingReviewsLoading, setReviews } = reviewSlice.actions
