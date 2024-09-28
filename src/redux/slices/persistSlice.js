import { createSlice } from '@reduxjs/toolkit'
const initialState = { userName: '' }
const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = 'mido'
    },
    logout: (state, action) => {
      state.userName = ''
    },
  },
})
export const persist = persistSlice.reducer
export const { login, logout } = persistSlice.actions
