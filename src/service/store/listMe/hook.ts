import { useDispatch } from 'react-redux'
import { stores } from './store'
import { useEffect, useRef } from 'react'
import { useStoreApp } from '../index';
export const useListMe = () => {
    const {
        data,
        loading,
        loading_more,
        end_data,
        time_request,
        time_expired,
        limit,
        page,
        time_click,
        params,
        count
    } = useStoreApp(state => state.ListMe)
    const dispatch = useDispatch()
    const paramsRef = useRef(params ?? {})
    const onRefresh = async () => {
        let count_time = new Date().getTime() - time_request
        if (count_time > time_click || time_request == 0) {
            await dispatch(stores.updateState({ loading: true }))//category_id: JSON.stringify([2572]),
            await dispatch(stores.getListCustomer({ page: 1, limit, ...paramsRef.current }))
            await dispatch(stores.getCountListCustomer({ ...paramsRef.current }))
            await dispatch(stores.updateState({ loading: false }))
        }
    }
    const updateParamsRef = (e = {}) => {
        paramsRef.current = { ...paramsRef.current, ...e }
        dispatch(stores.updateParams({ ...paramsRef.current, ...e }))
    }
    const onLoadMore = async () => {
        if (loading_more || end_data) return
        await dispatch(stores.updateState({ loading_more: true }))
        await dispatch(stores.getListCustomer({ page: page + 1, limit, ...paramsRef.current }))
        await dispatch(stores.updateState({ loading_more: false }))
    }
    useEffect(() => {
        let count_time = new Date().getTime() - time_request
        if (count_time > time_expired || time_request == 0) onRefresh()
    }, [time_request])
    return {
        data,
        count,
        loading,
        loading_more,
        end_data,
        params,
        updateParamsRef,
        onRefresh,
        onLoadMore,
    }
}