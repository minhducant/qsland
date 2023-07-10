import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRequest } from '@service/hook/base'
import { BookingApi, CustomerApi, DenyAdminApi, NewsApi, ProjectApi, TransactionApi } from '@api/qsland'
import store, { StaticCustomer, UserData } from '@service/store'
import { useStoreApp } from '@service/store'
import { toObjectKey } from '@utils/array'
import { TYPE_NEWS } from '@service/constant/constant';
export const useTimeCount = (time_hold: number) => {
    if (time_hold == 0) return { t: 0, s: false }
    const timeCurrent = useRef(time_hold)
    const s = useRef(true)
    useMemo(() => {
        // console.log('useMemo', time_hold)
        timeCurrent.current = time_hold
        s.current = true
    }, [time_hold])
    const forceUpdate = useState(false)[1]
    useEffect(() => {
        const cache = setInterval(() => {
            if (timeCurrent.current == 0) {
                clearInterval(cache)
                s.current = false
                forceUpdate(p => !p)
            }
            else {
                timeCurrent.current = timeCurrent.current - 1
                forceUpdate(p => !p)
            }
        }, 1000)
        return () => { clearInterval(cache) }
    }, [])
    return { t: timeCurrent.current, s: s.current }
}


export const useListSourceCustomer = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListSource)
    return {
        data,
        dataKey: toObjectKey(data, 'id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListSource()),
    }
}
export const useListGroupCustomer = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListGroup)
    return {
        data,
        dataKey: toObjectKey(data, 'id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListGroup()),
    }
}
export const useListCampaignCustomer = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListCampaign)
    return {
        data,
        dataKey: toObjectKey(data, 'id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListCampaign()),
    }
}
export const useListCitiesStatic = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListCities)
    return {
        data,
        onRefresh: () => store.dispatch(StaticCustomer.getListCities()),
    }
}
export const useListExchange = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListExchange)
    return {
        data,
        dataKey: toObjectKey(data, 'id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListExchange()),
    }
}
export const useListCategories = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListCategories)
    return {
        data,
        dataKey: toObjectKey(data, 'id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListCategories()),
    }
}
export const useListBuilding = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListBuilding)
    return {
        data,
        dataKey: toObjectKey(data, 'id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListBuilding()),
    }
}
export const useListStaff = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListStaff)
    return {
        data,
        dataKey: toObjectKey(data, 'user_id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListStaff()),
    }
}
export const useUserInfo = () => {
    const data = useStoreApp(state => state.UserData)
    return {
        data,
        onRefresh: () => store.dispatch(UserData.getUserInfo()),
    }
}
/** */
export const useListDistricts = (id_parent: any) =>
    useRequest({
        init: [],
        params: { page: 1, limit: 10, province_id: id_parent },
        api: CustomerApi.getListDistricts,
        alert: true,
        require: ['province_id'],
    })
export const useListWard = (id_parent: any) =>
    useRequest({
        init: [],
        params: { page: 1, limit: 10, district_id: id_parent },
        api: CustomerApi.getListWard,
        alert: true,
        require: ['district_id'],
    })

export const useDetailDistricts = (id_child: number) =>
    useRequest({
        init: {},
        params: { id: id_child },
        api: CustomerApi.getDetailDistricts,
        alert: true,
    })
export const useDetailWard = (id_child: number) =>
    useRequest({
        init: {},
        params: { id: id_child },
        api: CustomerApi.getDetailWard,
        alert: true,
    })
export const useDetailDenyCustomer = (id: number) =>
    useRequest({
        init: {},
        params: { id },
        api: CustomerApi.getDetailDenyCustomer,
        alert: true,
    })
export const useDetailCustomer = <T>(id: number) =>
    useRequest<any>({
        init: {},
        params: { id },
        api: CustomerApi.getDetailCustomer,
        alert: true,
    })
export const useListCampaign = (customer_id: number) =>
    useRequest({
        init: [],
        params: { page: 1, limit: 30, customer_id },
        api: CustomerApi.getListSaleCustomerCampaignHistory,
        alert: true,
    })
export const useDetailDenyAdmin = (id: number) =>
    useRequest({
        init: {},
        params: { id },
        api: DenyAdminApi.getDetailDenyAdmin,
        alert: true,
    })
export const useListGroupSale = () => {
    const { data } = useStoreApp(state => state.StaticCustomer.ListGroupSale)
    return {
        data,
        dataKey: toObjectKey(data, 'id'),
        onRefresh: () => store.dispatch(StaticCustomer.getListGroupSale()),
    }
}
export const useListStaffByGroupId = (group_sale_id?: any) =>
    useRequest({
        init: [],
        params: { group_sale_id },
        api: DenyAdminApi.getListStaff,
        alert: true,
    })
export const useProjectDetail = <T>(id?: any) =>
    useRequest<T>({
        init: {},
        params: { id },
        api: ProjectApi.getDetailCategories,
        alert: true,
    })
export const useBookingDetail = <T>(id?: any) =>
    useRequest<T>({
        init: {},
        params: { id },
        api: BookingApi.getDetailCart,
        alert: true,
    })

export const useListCampaignProject = <T>(category_id?: any) => {
    const { updateParamInit, data, onRefresh, onLoadMore, loading, loadingEnd } = useRequest<T>({
        init: [],
        params: { limit: 100, category_id },
        api: ProjectApi.getListCampaignProject,
        alert: true,
    })
    return {
        updateParamsRef: updateParamInit,
        data,
        onRefresh,
        onLoadMore,
        loading,
        loading_more: loadingEnd
    }
}
export const useCampaignSaleDetail = <T>(id?: any) =>
    useRequest<T>({
        init: {},
        params: { id },
        api: ProjectApi.getDetailCampaignSale,
        alert: true,
    })
export const useListBuildingProject = <T>(category_id?: any) => {
    const { updateParamInit, data, onRefresh, onLoadMore, loading, loadingEnd } = useRequest<T>({
        init: [],
        params: { limit: 100, category_id },
        api: ProjectApi.getListBuilding,
        alert: true,
    })
    return {
        updateParamsRef: updateParamInit,
        data,
        onRefresh,
        onLoadMore,
        loading,
        loading_more: loadingEnd
    }
}
export const useListProductBuilding = <T>({ building_id, category_id, cart_id }: any) => {
    const { updateParamInit, data, onRefresh, onLoadMore, loading, loadingEnd } =
        useRequest<T>({
            init: [],
            params: { building_id, category_id, cart_id, page: null },
            api: ProjectApi.getListProduct,
            alert: true,
        })
    return {
        updateParamsRef: updateParamInit,
        data,
        onRefresh,
        onLoadMore,
        loading,
        loading_more: loadingEnd
    }
}
export const useDetailProduct = <T>(id?: any) =>
    useRequest<T>({
        init: {},
        params: { id },
        api: ProjectApi.getDetailProduct,
        alert: true,
    })
export const useListApartmentBuilding = <T>(building_id?: any) =>
    useRequest<T>({
        init: [],
        params: { building_id },
        api: ProjectApi.getListApartment,
        alert: true,
    })
export const useListLookBookApart = <T>() =>
    useRequest<T>({
        init: [],
        params: { limit: 100 },
        api: TransactionApi.getListLookBookApart,
        alert: true,
        refreshKey: "listBill"
    })

export const userListSalePolicy = <T>({ category_id, building_id }: any) =>
    useRequest<T>({
        init: [],
        params: { limit: 100, category_id, building_id },
        api: TransactionApi.getListSalePolicy,
        alert: true,
    })

export const userListProjectPop = <T>() =>
    useRequest<T>({
        init: [],
        params: { limit: 100, type_project: 1 },
        api: DenyAdminApi.getListCategories,
        alert: true,
    })
export const useDetailSalePolicy = <T>({ category_id, building_id }: any) =>
    useRequest<T>({
        init: {},
        params: { category_id, building_id },
        api: TransactionApi.getDetailSalePolicy,
        alert: true,
    })

export const useListEvents = <T>({ }: any) =>
    useRequest<T>({
        init: [],
        params: { limit: 30, type: TYPE_NEWS.sk_noi_bo.id },
        api: NewsApi.getListNews,
        alert: true,
    })
export const useDetailNew = <T>(id: number) =>
    useRequest<T>({
        init: {},
        params: { id },
        api: NewsApi.getDetailNews,
        alert: true,
    })
export const useListNews = <T>({ type }: any) =>
    useRequest<T>({
        init: [],
        params: { limit: 30, type },
        api: NewsApi.getListNews,
        alert: true,
    })