import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
  //   extraReducers: builder => {},
})
export const tokenReducer = tokenSlice.reducer
export const { setToken } = tokenSlice.actions
