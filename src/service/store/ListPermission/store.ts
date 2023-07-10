import { StaticApi } from '@api/qsland'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Log } from '@utils';
import { isArray, isObject } from 'underscore';
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
    name: 'ListPermission',
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
            .addCase(getListPermission.pending, (state,) => {
                return state
            })
            .addCase(getListPermission.fulfilled, (state, action: { payload: { data: any, status: any } }) => {
                const { data, status } = action.payload
                state.time_request = new Date().getTime()
                if (status === true && (JSON.stringify(state.data) !== JSON.stringify(data))) {
                    if (isArray(state.data)) {
                        // Log.d('state.data.length****', state.data.length)
                        if (data.length < state.limit) state.end_data = true
                        else state.end_data = false
                        // Log.d('end', state.end_data)
                    }
                    state.data = unique([...state.data, ...data])
                }
            })
    },
})

const getListPermission = createAsyncThunk(`getListPermissions`, async ({ ...rest }: { page: number, limit: number }) => {
    const res: any = await StaticApi.getListPermission({ ...rest })
    let sale = {
        id: -2,
        staff_object_id: 'nhan_vien_ban_hang',
        scope_type: 'nhan_vien_ban_hang',
        scope_id: -2
    }
    if (res.status && isObject(res?.rest?.permission) && isArray(res?.data)) {
        const { master } = res?.rest?.permission
        if (master === true) {
            let admin = {
                id: -1,
                staff_object_id: 'admin',
                scope_type: 'admin',
                scope_id: -1
            }
            return { ...res, data: [...res.data, admin] }
        }
    }
    return { ...res, data: [...res?.data, sale] }
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
    getListPermission,
}
