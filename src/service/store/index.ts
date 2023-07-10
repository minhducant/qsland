import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { stores as Langue } from './settings/LangueSlice'
import { stores as Auth } from './Auth'
import { stores as UserData } from './UserData'
import { stores as ListAllocation } from './ListAllocation/store'
import { stores as ListDeny } from './ListDeny/store'
import { stores as ListMe } from './ListMe/store'
import { stores as StaticCustomer } from './StaticCustomer'
import { stores as ListAdDenyWait } from './ListAdDenyWait/store'
import { stores as ListAdDenyDone } from './ListAdDenyDone/store'
import { stores as ListAdDenyNone } from './ListAdDenyNone/store'
import { stores as ListCategory } from './ListCategory/store'
import { stores as ListBooking } from './ListBooking/store'
import { stores as ListPermission } from './ListPermission/store'
import { stores as StaticCusStatus } from './StaticCusStatus/store'
import { stores as DetailBill } from './DetailBill/store'
//
import { stores as Notify } from './Notify/store'
//
const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    Langue: Langue.reducer,
    Auth: Auth.reducer,
    UserData: UserData.reducer,
    StaticCustomer: StaticCustomer.reducer,
    ListMe: ListMe.reducer,
    ListDeny: ListDeny.reducer,
    ListAllocation: ListAllocation.reducer,
    //
    ListAdDenyWait: ListAdDenyWait.reducer,
    ListAdDenyDone: ListAdDenyDone.reducer,
    ListAdDenyNone: ListAdDenyNone.reducer,
    //
    StaticCusStatus: StaticCusStatus.reducer,
    Notify: Notify.reducer,
    ListCategory: ListCategory.reducer,
    ListBooking: ListBooking.reducer,
    ListPermission: ListPermission.reducer,
    DetailBill: DetailBill.reducer,
  },
})
export default store
export type StoreType = ReturnType<typeof store.getState>
export const useStoreApp = (fc: (state: StoreType) => any) => useSelector(fc)
export * from './stores'