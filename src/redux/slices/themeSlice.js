import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  //   reducers: {},
})
export const themeReducer = themeSlice.reducer
// export const {} = themeSlice.actions
