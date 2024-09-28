import { createSlice } from '@reduxjs/toolkit'
const initialState = { x: 5 }
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: { testF: () => {} },
})
export const test = testSlice.reducer
export const { testF } = testSlice.actions
