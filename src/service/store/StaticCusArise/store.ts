import { StaticApi } from '@api/qsland'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isArray } from 'underscore';
type props = {
    data: any[]
    loading: boolean
    time_request: any
    time_expired: any
    time_click: any
    params: any
}
const initialState: props = {
    data: [],
    loading: false,
    time_request: 0,
    time_expired: 10 * 1000,
    time_click: 1000,
    params: {},
}
const store = createSlice({
    name: 'StaticCusStatus',
    initialState,
    reducers: {
        refreshState(state) {
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
        updateItem(state, action) {
            let { id, ...rest } = action.payload
            let index = state.data.findIndex(i => i.id == id)
            if (index !== undefined) {
                state.data[index] = action.payload
            }
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
            .addCase(getStaticCusStatus.pending, (state,) => {
                return state
            })
            .addCase(getStaticCusStatus.fulfilled, (state, action: { payload: { data: any, status: any } }) => {
                const { data, status } = action.payload
                state.time_request = new Date().getTime()
                if (status === true && (JSON.stringify(state.data) !== JSON.stringify(data))) {
                    if (isArray(state.data)) {
                        state.data = data
                    }
                }
            })

    },
})

const getStaticCusStatus = createAsyncThunk(`getStaticCusStatus`, async ({ ...rest }: any) => {
    return StaticApi.getStaticCusStatus({ ...rest })
})
export const stores = {
    reducer: store.reducer,
    ...store.actions,
    getStaticCusStatus,
}
