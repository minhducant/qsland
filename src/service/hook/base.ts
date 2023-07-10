import { ToastAppError } from '@components/Toast'
import { Log } from '@utils'
import { useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { isArray, isEmpty, isEqual, isNumber, isObject, lastIndexOf } from 'underscore'

type useRequestProps = {
  init: any,
  params: any & { limit: number },
  api: any,
  offEffect?: boolean,
  limit_key?: string,
  page_key?: string
  alert?: boolean
  /**
   * 
   * Không truyền value vào params sẽ cache
   */
  require?: string[]

  refreshKey?: string
}

export const useRequest = <T>({ init, params = { limit: 10 }, api, offEffect, limit_key = "limit", page_key = "page", alert = false, require, refreshKey }: useRequestProps) => {
  const [data, setData] = useState<T>(init)
  const [loading, setLoading] = useState(false)
  const [loadingEnd, setLoadingEnd] = useState(false)
  const endData = useRef(false)
  const page = useRef(0)
  const { limit, ...initParams } = params
  const paramsInit = useRef(initParams)
  useEffect(() => {
    if (!offEffect) onRefresh()
  }, [])
  async function onRefresh() {
    try {
      // Log.d('onRefresh1', paramsInit.current)
      if (!_checkRequest()) return
      // Log.d('onRefresh2', paramsInit.current)
      setLoading(true)
      setLoadingEnd(false)
      if (isArray(init) && typeof api == "function") {
        endData.current = false
        page.current = 1
        //res default response isObject = true
        const res = convertRes(await api({
          ...paramsInit.current,
          ...{ [page_key]: page.current, [limit_key]: limit },
        }))
        // Log.e('res', res)
        // Log.e('res', res.status)
        // Log.e('res', res.mess)
        // Log.e('handleResponse(res, isArray)', handleResponse(res, isArray))
        if (handleResponse(res, isArray)) setData(res.data)
        if (handleEndData(res.data)) endData.current = true
      }
      else if (isObject(init) && typeof api == "function") {
        const res = convertRes(await api({
          ...paramsInit.current,
        }))
        if (handleResponse(res, isObject)) setData(res.data)
      }
      setLoading(false)
    } catch (error) {
      Log.e('onRefresh', error)
      setLoading(false)
    }
  }
  async function onLoadMore() {
    try {
      if (!_checkRequest()) return
      if (isArray(init) && endData.current == false) {
        setLoadingEnd(true)
        page.current = page.current + 1
        const res = convertRes(await api({
          ...paramsInit.current,
          ...{ [page_key]: page.current, [limit_key]: limit },
        }))
        if (handleResponse(res, isArray)) setData((prev: any) => [...prev, ...res.data])
        if (handleEndData(res.data)) endData.current = true
        setLoadingEnd(false)
      }
    } catch (error) {
      setLoadingEnd(false)
      Log.e('onLoadMore', error)
    }
  }
  function handleResponse(res: any, check: any) {
    if (res.status) {
      if (check(res.data)) return true
    }
    else {
      if (alert) ToastAppError(res.mess)
    }
    return false
  }
  function handleEndData(data: any[]) {
    if (isArray(data)) {
      if (data.length < limit) return true
    }
    return false
  }
  function updateData(value: any, key: string = "id") {
    if (isArray(init) && isArray(data)) {
      let indexOf = data.findIndex(i => i[key] !== undefined && i[key] == value[key])

      if (indexOf != -1) {
        if (!isEqual(data[indexOf], value))
          setData((prev: any[]) => {
            let newData = [...prev]
            newData[indexOf] = value
            return newData
          })
      }
    }
  }
  function updateParamInit(data: any) {
    if (data) {
      paramsInit.current = { ...paramsInit.current, ...data }
    }

  }
  function convertRes(res: any) {
    // if (res.data && res.status) return res
    // if (res) return { data: res }
    return res
  }
  function _checkRequest() {
    let check = true
    if (isArray(require) && require.length > 0) {
      require.forEach(key => {
        if (paramsInit.current[key] === null || paramsInit.current[key] === undefined)
          check = false
      })
    }
    return check
  }
  function updateItem(item: any, key = "id") {
    if (isArray(data)) {
      let id = item[key]
      let index = data.findIndex(i => i[key] == id)
      if (index !== undefined) {
        data[index] = item
        setData([...data])
      }
    }
  }
  const [forceRefresh, setForceRefresh] = useState<-1 | boolean>(-1)
  useEffect(() => {
    if (forceRefresh != -1) onRefresh()
  }, [forceRefresh])
  useEffect(() => {
    if (refreshKey)
      EventRegister.addEventListener(refreshKey, data => {
        if (forceRefresh != -1) setForceRefresh(p => !p)
        else setForceRefresh(true)

      })
    return () => {
      if (refreshKey) EventRegister.removeEventListener(refreshKey)
    }
  }, [])

  return {
    onRefresh,
    onLoadMore,
    data,
    loading,
    loadingEnd,
    page: page.current,
    endData: endData.current,
    limit,
    updateData,
    updateParamInit,
    updateItem,
    params: paramsInit.current
  }
}
export type useRequest = {
  onRefresh: () => void
  onLoadMore: () => void
  data: any
  loading: any
  loadingEnd: any
  page: any
  endData: any
  limit: any
  updateData: (data: any) => void
  updateParamInit: (data: any) => void
}