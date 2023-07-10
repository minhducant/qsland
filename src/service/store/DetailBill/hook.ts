import { useDispatch, useSelector } from 'react-redux'
import { stores } from './store'
import { useEffect, useRef } from 'react'
import { useStoreApp } from '../index';
import { Log } from '@utils/Log';
import { useListPermission } from '../ListPermission/hook';
import { BillDetail, TransactionDetail } from '@utils/type';
import { TINH_TRANG_BILL } from '@service/constant/constant';
export const useDetailBill = (id?: number) => {
    const {
        data,
        loading,
        time_request,
        time_expired,
        params,
        count
    } = useStoreApp(state => state.DetailBill)
    const { checkID, checkUserID, user } = useListPermission()
    const bill: BillDetail = data?.bill
    const dispatch = useDispatch()
    const paramsRef = useRef({ ...params, id })
    const onRefresh = async () => {
        if (!id) return
        await dispatch(stores.updateSate({ loading: true }))
        await dispatch(stores.getDetailBill({ ...paramsRef.current }))
        await dispatch(stores.updateSate({ loading: false }))
    }
    const updateParamsRef = (e = {}) => {
        paramsRef.current = { ...paramsRef.current, ...e }
        dispatch(stores.updateParams({ ...paramsRef.current, ...e }))
    }

    // Log.e('useDetailBill', data)
    Log.e('user', user?.user_id)
    Log.e('p22', checkID('thukydonvi', bill?.exchange_id))
    useEffect(() => {
        let count_time = new Date().getTime() - time_request
        if (count_time > time_expired || time_request == 0) onRefresh()
        return () => {
            // dispatch(stores.refreshState())
        }
    }, [])
    const checkSTATUS = (type: keyof typeof TINH_TRANG_BILL) => {
        if (bill?.status == TINH_TRANG_BILL[type].id) return true
        return false
    }

    const permission = {
        phe_duyet: checkID('thukydonvi', bill?.exchange_id) && checkSTATUS('cho_thu_ky_san_duyet'),
        yeu_cau_huy: checkUserID(bill?.user_sale_id) && checkSTATUS('cho_thu_ky_san_duyet'),
        chon_san_pham: checkID('thukydonvi', bill?.exchange_id),
        yc_thanh_toan: checkUserID(bill?.user_sale_id)
    }
    // functin
    return {
        data,
        count,
        loading,
        params,
        updateParamsRef,
        onRefresh,
        permission
    }
}

