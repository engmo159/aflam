import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
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
export const signInFunction = createAsyncThunk(
  '/signInFunction',
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.post('/user/signin', userData)
      return data
    } catch (e) {
      return rejectWithValue(e.response.data || 'Signup failed')
    }
  }
)
export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (token, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await api.get('/user/info', {
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
  userData: null,
  signUpLoading: false,
  signUpErr: null,
  signInLoading: false,
  signInErr: null,
  showSignInModal: false,
  signUpToastState: false,
  signInToastState: false,
  userInfoErr: null,
  userInfoLoading: false,
}
const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchShowSignInModal: state => {
      state.showSignInModal = !state.showSignInModal
    },
    signInToastStateReset: state => {
      state.signInToastState = false
    },
    signUpToastStateReset: state => {
      state.signUpToastState = false
    },
  },
  extraReducers: builder => {
    // sign up
    builder.addCase(signUpFunction.pending, state => {
      state.signUpLoading = true
      state.signUpErr = null
      state.userData = null
      state.signUpToastState = false
    })
    builder.addCase(signUpFunction.fulfilled, (state, action) => {
      state.signUpLoading = false
      state.userData = action?.payload
      state.signUpToastState = true
    })

    builder.addCase(signUpFunction.rejected, (state, action) => {
      state.signUpLoading = false
      state.signUpToastState = false
      state.signUpErr = action.payload.message || 'something went error'
    })
    // sign in
    builder.addCase(signInFunction.pending, state => {
      state.signInLoading = true
      state.signInErr = null
      state.userData = null
      state.signInToastState = false
    })
    builder.addCase(signInFunction.fulfilled, (state, action) => {
      state.signInLoading = false
      state.userData = action?.payload
      state.signInToastState = true
    })

    builder.addCase(signInFunction.rejected, (state, action) => {
      state.signInLoading = false
      state.signInToastState = false
      state.signInErr = action.payload.message || 'something went error'
    })

    // get user info
    builder.addCase(getUserInfo.pending, state => {
      state.userInfoLoading = true
      state.userData = null
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfoLoading = false
      state.userData = action?.payload.data
    })

    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.userInfoLoading = false
      state.userInfoErr = action.payload.message || 'something went error'
    })
  },
})
export const userAuthReducer = userAuthSlice.reducer
export const {
  switchShowSignInModal,
  signInToastStateReset,
  signUpToastStateReset,
} = userAuthSlice.actions
