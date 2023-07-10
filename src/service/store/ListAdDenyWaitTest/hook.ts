import { useDispatch, useSelector } from 'react-redux'
import { stores } from './reducer'
import { useEffect, useRef } from 'react'
import { useStoreApp } from '../index';
export const useListAdDenyWait = () => {
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
    } = useStoreApp(state => state.ListAdDenyWait)
    const onRefresh = Service_ListAdDenyWait.onRefresh
    const updateParamsRef = Service_ListAdDenyWait.setParams
    const onLoadMore = Service_ListAdDenyWait.onLoadMore
    const onRefreshCount = Service_ListAdDenyWait.onRefreshCount
    useEffect(() => {
        Service_ListAdDenyWait.init(params)
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
import Store from '../index'
import { DenyAdminApi } from '@api/qsland';
import { ToastAppError, ToastAppSuccess } from '@components/Toast';
import { AppLang } from '@assets/langs';
import { goBack } from '@navigation/rootNavigation';
export class Service_ListAdDenyWait {
    static params: any = {}
    static init(params: any) {
        this.params = params
    }
    static setParams(params: any) {
        this.params = params
        Store.dispatch(stores.updateParams({ ...this.params, ...params }))
    }
    static async onRefresh() {
        const { time_request, time_click, limit, } = Store.getState().ListAdDenyWait
        let count_time = new Date().getTime() - time_request
        if (count_time > time_click || time_request == 0) {
            await Store.dispatch(stores.updateSate({ loading: true }))
            await Store.dispatch(stores.getListAdDenyWait({ page: 1, limit, ...this.params }))
            await Store.dispatch(stores.getCountListAdDenyWait({ ...this.params }))
            await Store.dispatch(stores.updateSate({ loading: false }))
        }
    }
    static async onLoadMore() {
        const { loading_more, end_data, page, limit, } = Store.getState().ListAdDenyWait
        if (loading_more || end_data) return
        await Store.dispatch(stores.updateSate({ loading_more: true }))
        await Store.dispatch(stores.getListAdDenyWait({ page: page + 1, limit, ...this.params }))
        await Store.dispatch(stores.updateSate({ loading_more: false }))
    }
    static onRefreshCount() { Store.dispatch(stores.getCountListAdDenyWait({ ...this.params })) }

    static async acceptRequest({ id, ...data }: any, type: boolean) {
        let res: any = {}
        if (type == true) {
            res = await DenyAdminApi.addDenyAdmin({ id, status: 3 })
        }
        if (type == false) {
            res = await DenyAdminApi.addDenyAdmin({ id, status: 4 })
        }
        if (res.status) {

            ToastAppSuccess(AppLang('thanh_cong'))
            const { id, status } = res?.data?.item
            id && Store.dispatch(stores.updateItem({ ...data, status }))
            id && this.onRefresh()
            id && this.onRefreshCount()
            id && Service_ListAdDenyWait.onLoadMore()
            goBack()
        }
        else ToastAppError(res.mess)
    }
}