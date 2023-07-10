import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  roles: [],
  info: null,
  status: '0',
}
const store = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setStatusApp(state, action) {
      state.status = action.payload
      return state
    },
    setInfoApp(state, action) {
      state.info = action.payload
      return state
    },
    setRole(state, action) {
      state.roles = action.payload
      return state
    },
  },
})
export const stores = {
  reducer: store.reducer,
  ...store.actions,
}
