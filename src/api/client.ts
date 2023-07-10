import { ToastAppClear, ToastAppError } from '@components'
import { Log } from '@utils'
import axios, { AxiosRequestConfig } from 'axios'
import { AppLang } from '@assets/langs'
import { getStorage } from 'src/lib/storage'
import { setStorage } from '@lib/storage'
import { onLogout } from '@screen/splash/logout'
import moment from 'moment'
import { SettingApp } from '@assets/common'
import { LoadingApp } from '@components/loading'
export const client = axios.create({
  baseURL: SettingApp.domain,
  timeout: 30000,
})

client.interceptors.request.use(
  async function (config) {
    // Log.e1('config', config)
    const token = await getStorage('token')
    const info = await getStorage('info') //get or gen info
    if (!config.headers) config.headers = {}
    if (token) config.headers['authorization'] = `Bearer ${token}`
    config.headers['info'] = JSON.stringify(info)
    // Log.e1('config2--request', config.headers)
    // console.log("dddđ", config)
    config.onUploadProgress = (e: any) => {
      // Log.d('progressEvent', e);
      let loaded = e?.loaded
      let total = e?.total
      let progress = (loaded / total)
      Log.d('uploading....', parseFloat(progress.toFixed(2)))
      LoadingApp.setProgress(parseFloat(progress.toFixed(2)))
    }
    // config.onDownloadProgress
    return config
  },
  function (error) {
    // Log.e1('error--request', error)
    alert(JSON.stringify(error))
  },
)
client.interceptors.response.use(
  async function (response) {
    // Log.g1('response: ', response.data)
    if (response.data?.status == false) {
      if (response.data?.mess == 'token-expired') {
        Log.e('onLogout')
        onLogout()
        ToastAppClear()
        // goLogout out
        return {
          state: false,
          data: null,
          mess: 'Phiên đăng nhập hết hạn',
        }
      }
    }
    if (response.data?.status != true) {
      let dataApi = {
        method: response.config?.method,
        headers_info: response.config.headers?.info,
        baseURL: response.config?.baseURL,
        url: response.config?.url,
        authorization: response.config.headers?.authorization,
        response: response.data,
        request: response.config.data,
        status: response.status,
      }
      setStorage(
        'debug-api:' + dataApi.url + moment().format('HH:mm:ss DD/MM/YYYY'),
        dataApi,
      )
    }
    const z_debug = {
      a_url: `${response.config?.baseURL}${response.config?.url}`,
      b_authorization: response.config.headers?.authorization,
      data: response.config.data,
    }
    return { ...response.data, z_debug }
  },
  async function (error) {
    let { name, message, ...e } = error
    Log.e('error-response', error)
    // Log.e('name', name)
    // if (message == 'no_network') {
    //   console.log('not_net', not_net)
    //   if (not_net) {
    //     if (not_net == 'false') ToastAppError(AppLang('vui_long_ket_noi'))
    //   }
    //   if (!not_net) ToastAppError(AppLang('vui_long_ket_noi'))
    //   return {
    //     status: false,
    //     mess: AppLang('vui_long_ket_noi'),
    //   }
    // }
    if (name === 'AxiosError' && message === 'Network Error') {
      message = `${AppLang('loi_ket_noi')} \n[AxiosNetworkError]`
    }
    if (error.response) {
      if (error.response.status >= 500) message = 'server error '
      if (error.response.status >= 400)
        message = `${AppLang('may_chu_loi')}!\n[${AppLang('ma_loi')}:${error.response.status
          }] `
    } else if (error?.message.startsWith('timeout of'))
      message = `${AppLang('ht_phan_hoi_lau')}!\n[server timeout]`
    __DEV__ && ToastAppError(message)
    return { status: false, mess: message, no_connect: true, data: null }
  },
)
