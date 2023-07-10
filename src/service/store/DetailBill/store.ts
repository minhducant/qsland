import { TransactionApi } from '@api/qsland'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Log } from '@utils';
import { isArray } from 'underscore';
type props = {
    data: any
    loading: boolean
    time_request: any
    time_expired: any
    time_click: any
    params: any
}
const initialState: props = {
    data: {},
    loading: false,
    time_request: 0,
    time_expired: 10 * 1000,
    time_click: 1000,
    params: {},
}
const store = createSlice({
    name: 'DetailBill',
    initialState,
    reducers: {
        refreshState(state) {
            console.log('refreshState');

            state = { ...initialState }
            return state
        },
        resetTime(state) {
            return state
        },
        updateSate(state, action) {
            state = { ...state, ...action.payload }
            return state
        },
        updateParams(state, action) {
            let params = action.payload ?? {}
            state.params = { ...state.params, ...params }
            return state
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getDetailBill.pending, (state,) => {
                return state
            })
            .addCase(getDetailBill.fulfilled, (state, action: { payload: { data: any, status: any, } }) => {
                const { data, status } = action.payload
                state.time_request = new Date().getTime()
                if (status === true && (JSON.stringify(state.data) !== JSON.stringify(data))) {
                    state.data = data
                    return state
                }
            })

    },
})

const getDetailBill = createAsyncThunk(`getDetailBill`, async ({ ...rest }: any) => {
    const res = await TransactionApi.getDetailBill({ ...rest })
    return { ...res, }
})
export const stores = {
    reducer: store.reducer,
    getDetailBill,
    ...store.actions,
}
