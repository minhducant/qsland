import React, { useEffect, useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ToastAppSuccess } from '@components'
import { AppLang } from '@assets/langs'
import { AppColor } from '@assets/colors'
import { useUpgradeJs } from './useUpgradeJs'

export class Upgrade {
  static ref: any = null
  static isShow: boolean
  static setRef(ref: any) {
    this.ref = ref
  }
  static show() {
    if (this.ref) this.ref.open()
  }
  static hide() {
    if (this.ref) this.ref.close()
  }
  static setShow(value: boolean) {
    this.isShow = value
  }
  static setDots(value: any) {
    if (this.ref) this.ref.updateDots(value)
  }
}
export const UpgradeJs = React.forwardRef((prop, ref) => {
  const [visible, setVisible] = useState(false)
  function onRequestClose() {
    setVisible(false)
  }
  React.useImperativeHandle(ref, () => ({
    open() {
      setVisible(true)
    },
    close() {
      setVisible(false)
    },
    updateDots(value: any) {
      setDots(value)
    },
  }))
  const hidePopup = () => {
    setVisible(false)
    Upgrade.setShow(false)
    ToastAppSuccess(AppLang('cap_nhat_sau_khi_tai') + '!')
  }
  const [dots, setDots] = useState(0)
  const { } = useUpgradeJs(true)
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onRequestClose}
      animationType='fade'>
      <View style={styles.container}>
        <View style={[styles.box]}>
          <Text style={{ fontSize: 16, color: '#4682B4' }}>
            {AppLang('dang_cap_nhat')}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'bold',
              color: AppColor('primary'),
            }}>{`${dots}%`}</Text>
          <TouchableOpacity
            style={[
              styles.btn_close,
              { marginVertical: 15, backgroundColor: '#efefef' },
            ]}
            onPress={hidePopup}>
            <Text style={{ fontSize: 14 }}>{AppLang('an')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000007C',
  },
  box: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 3,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.1,
    padding: 25,
  },
  btn_close: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 100,
  },
})
