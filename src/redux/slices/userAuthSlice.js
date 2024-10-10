import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
  },
})

export const signUpFunction = createAsyncThunk(
  '/signUpFunction',
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.post('/user/signup', userData)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data || 'Signup failed')
    }
  }
)

const initialState = {
  userData: null,
  signUpLoading: false,
  signUpErr: null,
  showSignInModal: false,
  toastState: false,
}
const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchShowSignInModal: state => {
      state.showSignInModal = !state.showSignInModal
    },
    toastStateReset: state => {
      state.toastState = false
    },
  },
  extraReducers: builder => {
    // sign up
    builder.addCase(signUpFunction.pending, state => {
      state.signUpLoading = true
      state.signUpErr = null
      state.userData = null
      state.toastState = false
    })
    builder.addCase(signUpFunction.fulfilled, (state, action) => {
      state.signUpLoading = false
      state.userData = action?.payload
      state.toastState = true
    })

    builder.addCase(signUpFunction.rejected, (state, action) => {
      state.signUpLoading = false
      state.toastState = false
      state.signUpErr = action.payload.message || 'something went error'
    })
  },
})
export const userAuthReducer = userAuthSlice.reducer
export const { switchShowSignInModal, toastStateReset } = userAuthSlice.actions
