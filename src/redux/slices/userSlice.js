import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsers = createAsyncThunk('/getUsers', async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const { data } = await axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users',
    })
    return data
  } catch (e) {
    return rejectWithValue(e)
  }
})
export const getUserDetails = createAsyncThunk(
  '/getUsers/userId',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://jsonplaceholder.typicode.com/users/${id}`,
      })
      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const initialState = {
  users: [],
  loading: true,
  err: null,
  userInfo: null,
  userInfoLoading: true,
  userInfoError: null,
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // get all users
    builder.addCase(getUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.usersStartingWithK = action.payload.filter(obj =>
        obj.username.startsWith('K')
      )
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false
      state.err = action.payload.message
    })
    // get single user
    builder.addCase(getUserDetails.pending, state => {
      state.userInfoLoading = true
    })
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.userInfoLoading = false
      state.userInfo = action.payload
    })
    builder.addCase(getUserDetails.rejected, state => {
      state.userInfoLoading = false
    })
  },
})
export const allUsers = userSlice.reducer
