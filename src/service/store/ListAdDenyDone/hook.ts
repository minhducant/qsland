import { useDispatch, useSelector } from 'react-redux'
import { stores } from './store'
import { useEffect, useRef } from 'react'
import { useStoreApp } from '../index';
export const useListAdDenyDone = () => {
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
    } = useStoreApp(state => state.ListAdDenyDone)
    // const userData = useStoreApp(state => state.UserData)
    const dispatch = useDispatch()
    const paramsRef = useRef({ ...params, status: JSON.stringify([3, 4, 5, 6]) })
    const onRefresh = async () => {
        let count_time = new Date().getTime() - time_request
        if (count_time > time_click || time_request == 0) {
            await dispatch(stores.updateSate({ loading: true }))
            await dispatch(stores.getListAdDenyDone({ page: 1, limit, ...paramsRef.current }))
            await dispatch(stores.getCountListAdDenyDone({ ...paramsRef.current }))
            await dispatch(stores.updateSate({ loading: false }))
        }
    }
    const updateParamsRef = (e = {}) => {
        paramsRef.current = { ...paramsRef.current, ...e }
        dispatch(stores.updateParams({ ...paramsRef.current, ...e }))
    }
    const onLoadMore = async () => {
        if (loading_more || end_data) return
        await dispatch(stores.updateSate({ loading_more: true }))
        await dispatch(stores.getListAdDenyDone({ page: page + 1, limit, ...paramsRef.current }))
        await dispatch(stores.updateSate({ loading_more: false }))
    }
    const onRefreshCount = () => dispatch(stores.getCountListAdDenyDone({ ...paramsRef.current }))

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
        onRefreshCount
    }
}

