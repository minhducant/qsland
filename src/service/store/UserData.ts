import { AuthApi } from '@api/qsland'
const initialState: Partial<T_userData> = {}
import { T_userData } from '@api/qsland/TypeData'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
const store = createSlice({
  name: 'dataUser',
  initialState,
  reducers: {
    setDataUser(state, action) {
      state = action.payload
      return state
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        return state
      })
      .addCase(getUserInfo.fulfilled, (state, action: any) => {
        if (action.payload.status === true)
          state = action.payload.data
        return state
      })

  },
})
const getUserInfo = createAsyncThunk(`getUserInfo,`, async () => {
  return await AuthApi.getInfo({})
})
export const stores = {
  reducer: store.reducer,
  ...store.actions,
  getUserInfo
}
