import { useDispatch, useSelector } from 'react-redux'
import { stores } from './store'
import { useEffect, useRef } from 'react'
import { useStoreApp } from '../index';
import { Permission } from '@utils/type';
import { groupBy } from '@utils/array';
import { Log } from '@utils/Log';
import { arrayData } from '@utils/format';
export const useListPermission = () => {
    const {
        data,
        loading,
        time_request,
        time_expired,
        time_click,
        params,
    } = useStoreApp(state => state.ListPermission)
    const user = useStoreApp(state => state.UserData)
    // const userData = useStoreApp(state => state.UserData)
    const dispatch = useDispatch()
    const paramsRef = useRef({ ...params, })
    const onRefresh = async () => {
        let count_time = new Date().getTime() - time_request
        if (count_time > time_click || time_request == 0) {
            await dispatch(stores.updateSate({ loading: true }))
            await dispatch(stores.getListPermission({ ...paramsRef.current }))
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
    const group = groupBy(data, 'staff_object_id')//data.group(({ staff_object_id }: any) => staff_object_id)
    const groupID = Object.entries(group).map(([key, list]) => {

        const ListID = arrayData(list).map(({ scope_id }: any) => scope_id)
        return [key, ListID]
    })
    // Log.d1('group', group)
    // Log.d1('groupID', groupID)
    function checkID(type: Permission, id: number) {
        if (group[type]) {
            if (group[type].find((i: any) => i.scope_id == id)) return true
        }
        return false
    }
    function checkUserID(id: number) {
        if (user?.user_id && id) {
            if (user?.user_id == id) return true
        }
        return false
    }
    return {
        data,
        loading,
        params,
        updateParamsRef,
        onRefresh,
        group,
        groupID,
        checkID,
        user,
        checkUserID
    }
}

