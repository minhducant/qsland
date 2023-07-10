import { AppLang } from '@assets/langs'
import { useEffect, useState } from 'react'
import CodePush from 'react-native-code-push'
import { Upgrade } from './UpdateJs'
import { ToastAppSuccess } from '@components'

export const useUpgradeJs = (autoUpdate = true) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [dots, setDots] = useState(0)
  const [content, setContent] = useState(AppLang('dang_tai'))
  const CheckVersionUpdate = async () => {
    let rs = await CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      status => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            Upgrade?.show()
            Upgrade?.setDots(0)
            setContent(AppLang('dang_tai'))
            setIsUpdating(true)
            break
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            setContent(AppLang('dang_cai_dat'))
            break
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            setContent(AppLang('cai_dat_thanh_cong'))
            // let status = Upgrade.isShow
            // if (!status) ToastAppSuccess(AppLang('vui_long_doi_cap_nhat'))
            // setIsUpdating(false)
            break
        }
      },
      ({ receivedBytes, totalBytes }) => {
        console.log(
          'downloading status ',
          Math.round((receivedBytes / totalBytes) * 100),
        )

        Upgrade?.setDots &&
          Upgrade?.setDots(Math.round((receivedBytes / totalBytes) * 100))
      },
    )
    console.log('Version code push: ', rs)
    if (rs == 0) {
      if (!autoUpdate) ToastAppSuccess(AppLang('phien_ban_moi_nhat'))
      return
    }
    //version last
    else {
    }
    return rs
  }
  useEffect(() => {
    if (autoUpdate) CheckVersionUpdate()
  }, [])
  return { isUpdating, dots, content, CheckVersionUpdate }
}
