import { EN } from '@assets/langs/en'
import { VI } from '@assets/langs/vi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
export type LangState = {
  type: 'VI' | 'EN',
  VI: typeof VI
  EN: typeof EN
}

const initialState: LangState = {
  type: 'VI',
  VI: VI,
  EN: EN
}

const store = createSlice({
  name: 'Langue',
  initialState,
  reducers: {
    setTypeLang(state, action) {
      state.type = action.payload
      return state
    }
  }
})
export const stores = {
  reducer: store.reducer,
  ...store.actions,
}
