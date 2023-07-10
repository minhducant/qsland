import { StyleSheet, } from 'react-native'
import React, { useRef } from 'react'
import { Block, IconC, Touch } from '@mylib/UIKit'
import { screen_width, TextApp, ToastAppSuccess } from '@components'
import { AppColor } from '@assets/colors'
import { AppLang, } from '@assets/langs'
import CodePush from 'react-native-code-push'
import { SettingApp } from '@assets/common'

export default function Langue() {
  const _langue = useRef<any>()
  const changeLang = async (key: string) => {
    await SettingApp.setLangue(key)
    ToastAppSuccess(AppLang('vui_long_doi'))
    setTimeout(() => {
      CodePush.restartApp()
    }, 500)
    _langue.current.close()
  }
  const getLang = () => {
    let type = SettingApp.langue
    if (type == 'EN') return 'English'
    if (type == 'VI') return 'Tiếng Việt'
    return 'Ngôn ngữ'
  }
  return (
    <>
      <Block alignI='flex-end'>
        <Touch
          onPress={() => {
            _langue.current.open()
          }}
          padH10
          row
          centerH
          styleBox={styles.box}
          bg={AppColor('bg_gray')}>
          <Block row alignCenter>
            <IconC name='globe-outline' size={23} color={AppColor('ic_gray')} />
            <TextApp style={{ paddingLeft: 8 }}>{getLang()}</TextApp>
          </Block>
          <IconC
            name='chevron-down-outline'
            size={23}
            color={AppColor('ic_gray')}
          />
        </Touch>
      </Block>

    </>
  )
}

const styles = StyleSheet.create({
  box: {
    width: screen_width * 0.4,
    height: screen_width * 0.1,
    borderRadius: 100,
  },
})
