import {
  useListMe,
  useListDeny,
  useListAllocation,
  useStaticCusStatus,
  StaticCustomer,
  useListCategory,
  useListBooking,
  useListPermission,
} from '@service/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
export const asyncApp = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(StaticCustomer.getListSource())
    dispatch(StaticCustomer.getListGroup())
    dispatch(StaticCustomer.getListCities())
    dispatch(StaticCustomer.getListStaff())
    dispatch(StaticCustomer.getListExchange())
    dispatch(StaticCustomer.getListCampaign())
    dispatch(StaticCustomer.getListCategories())
    dispatch(StaticCustomer.getListGroupSale())
    dispatch(StaticCustomer.getListBuilding())
  }, [])
  useListMe()
  useListDeny()
  useListAllocation()
  useStaticCusStatus()
  useListCategory()
  useListBooking()
  useListPermission()
}
