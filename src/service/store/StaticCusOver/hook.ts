import { useDispatch, useSelector } from 'react-redux'
import { stores } from './store'
import { useEffect, useRef } from 'react'
import { useStoreApp } from '../index';
import moment from 'moment';
import format from 'pretty-format';
import { AppDate } from '@utils/date';
export const useStaticCusStatus = () => {
    const {
        data,
        loading,
        time_request,
        time_expired,
        time_click,
        params,

    } = useStoreApp(state => state.StaticCusStatus)
    // const userData = useStoreApp(state => state.UserData)
    const dispatch = useDispatch()
    const paramsRef = useRef({
        from: moment().subtract(1, 'M').format('YYYY-MM-DD 00:00:00'),
        to: moment().add(1, 'M').format('YYYY-MM-DD 23:59:59'),
        create_type: 2,
        ...params
    })
    const onRefresh = async () => {
        let count_time = new Date().getTime() - time_request
        if (count_time > time_click || time_request == 0) {
            await dispatch(stores.updateSate({ loading: true }))
            await dispatch(stores.getStaticCusStatus({ ...paramsRef.current }))
            await dispatch(stores.updateSate({ loading: false }))
        }
    }
    const updateParamsRef = (e = {}) => {
        paramsRef.current = { ...paramsRef.current, ...e }
        dispatch(stores.updateParams({ ...paramsRef.current, ...e }))
    }
    useEffect(() => {
        let count_time = new Date().getTime() - time_request
        if (count_time > time_expired || time_request == 0) onRefresh()
    }, [time_request])
    return {
        data,
        loading,
        params,
        updateParamsRef,
        onRefresh,
    }
}

const convertChart = () => {
    return []
}