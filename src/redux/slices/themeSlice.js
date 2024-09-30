import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,

  reducers: {
    changeTheme: state => {
      state.theme == 'light' ? (state.theme = 'dark') : (state.theme = 'light')
    },
  },
})
export const themeReducer = themeSlice.reducer
export const { changeTheme } = themeSlice.actions
