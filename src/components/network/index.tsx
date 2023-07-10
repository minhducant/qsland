import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { IconC } from '@mylib/UIKit'
import { useNetInfo } from '@react-native-community/netinfo'
import { Log } from '@utils'
import { setStorage } from '@lib/storage'
const NetConnect = (props: any, ref: any) => {
  const [visible, setVisible] = useState(true)
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    },
  }))
  const { details, isConnected, isInternetReachable, type } = useNetInfo()
  Log.e1('', isConnected)
  const check = async () => {
    await setStorage('NOT_NET', 'false')
  }
  useEffect(() => {
    isConnected && check()
  }, [isConnected])
  return (
    <>
      {!isConnected && (
        <View style={styles.container}>
          <View style={styles.box}>
            <IconC name='wifi' size={20} />
            <Text style={styles.txt}>{'Bạn đang offline!'}</Text>
          </View>
        </View>
      )}
    </>
  )
}
export default forwardRef(NetConnect)
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    position: 'absolute',
    bottom: 80,
    width: '100%',
    paddingLeft: 10,
  },
  box: {
    width: Dimensions.get('screen').width * 0.5,
    height: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    elevation: 3,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.1,
    flexDirection: 'row',
  },
  txt: { paddingLeft: 5 },
})

export class Network {
  static _object: any
  static create(value: any) {
    this._object = value
  }
  static show() {
    this._object.show()
  }
  static hide() {
    this._object.show()
  }
}
