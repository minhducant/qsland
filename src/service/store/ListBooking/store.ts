import { BookingApi, DenyAdminApi, TransactionApi } from '@api/qsland'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Log } from '@utils';
import { isArray, isEmpty } from 'underscore';
type props = {
    data: any[]
    loading: boolean
    loading_more: boolean
    end_data: boolean
    count: any
    time_request: any
    time_expired: any
    time_click: any
    limit: any
    page: any
    params: any
}
const initialState: props = {
    data: [],
    loading: false,
    loading_more: false,
    end_data: false,
    count: 0,
    time_request: 0,
    time_expired: 10 * 1000,
    time_click: 1000,
    limit: 30,
    page: 1,
    params: {},
}
const store = createSlice({
    name: 'ListAdDenyWait',
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
            .addCase(getListBooking.pending, (state,) => {
                return state
            })

            .addCase(getListBooking.fulfilled, (state, action: { payload: { data: any, status: any, page: number } }) => {
                const { page, data, status } = action.payload
                state.time_request = new Date().getTime()
                if (status === true && (JSON.stringify(state.data) !== JSON.stringify(data))) {
                    if (isArray(state.data)) {
                        if (data.length < state.limit) state.end_data = true
                        else state.end_data = false
                        Log.e('check state.end_data', state.end_data)
                    }
                    if (page == 1) {
                        state.page = 1
                        state.data = data
                        return state
                    }
                    else {
                        state.page = page
                        state.data = unique([...state.data, ...data])
                        return state
                    }
                }
            })
            .addCase(getCountListBooking.pending, (state) => {
                return state
            })
            .addCase(getCountListBooking.fulfilled, (state, action: { payload: { data: any, status: any } }) => {
                const { data, status } = action.payload
                if (status) {
                    state.count = data?.count
                    return state
                }
            })
    },
})

const getListBooking = createAsyncThunk(`getListBooking`, async ({ page, limit, ...rest }: { page: number, limit: number }) => {
    const res = await BookingApi.getListCart({ page, limit, ...rest })
    return { ...res, page }
})
const getCountListBooking = createAsyncThunk(`getCountListBooking`, async (params: any) => {
    const res: any = {}
    return { ...res }
})
function unique(arr: any) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (newArr.findIndex(value => arr[i].id === value.id) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

export const stores = {
    reducer: store.reducer,
    ...store.actions,
    getListBooking,
    getCountListBooking
}
