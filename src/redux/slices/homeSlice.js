import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  num: 0,
  users: [
    { id: 1, name: 'John', age: 20 },
    { id: 2, name: 'ahmed', age: 30 },
    { id: 3, name: 'mohamed', age: 40 },
    { id: 4, name: 'saeed', age: 50 },
  ],
}
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.num += action.payload
    },
    addAge: (state, { payload: id }) => {
      state.users.map(user => {
        if (user.id == id) {
          user.age += 1
        }
      })
    },
  },
})
export const myNum = homeSlice.reducer
export const { increment, addAge } = homeSlice.actions
