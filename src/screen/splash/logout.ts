import { multiRemove } from '@lib/storage'
import store from '@service/store'
import { ListAllocation, ListDeny, ListMe, UserData, Auth, ListAdDenyDone, ListAdDenyWait, ListAdDenyNone } from '@service/store'
import { Log } from '@utils'

export const onLogout = async () => {
  Log.d('handleLogout')
  store.dispatch(Auth.setStatusApp('1'))
  store.dispatch(UserData.setDataUser(null))
  store.dispatch(ListMe.refreshState())
  store.dispatch(ListAllocation.refreshState())
  store.dispatch(ListDeny.refreshState())
  store.dispatch(ListAdDenyDone.refreshState())
  store.dispatch(ListAdDenyWait.refreshState())
  store.dispatch(ListAdDenyNone.refreshState())
  multiRemove(['token', 'roles'])
}
