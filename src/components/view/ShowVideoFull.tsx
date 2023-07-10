import { TouchableOpacity, Modal } from 'react-native'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { IconC, ViewC } from '@mylib'
import SwiperMedia from './SwiperMedia'
import { Log } from '@utils'
import store from '@service/store'
import { delDataVideo } from '@service/store/slice/configSlice'
const ShowVideoFull = forwardRef(
  (props: { data: Array<any>; del: boolean }, ref: any) => {
    if (!props.data) return null
    if (!Array.isArray(props.data)) return null
    const [visible, setVisible] = useState(false)
    useImperativeHandle(ref, () => ({
      visible: (value: any) => {
        setVisible(value)
      },
    }))
    // const [poi, setPoi] = useState(0)
    const handleDeleteItem = () => {
      // store.dispatch(delDataVideo(poi))
      setVisible(false)
    }
    return (
      <Modal visible={visible}>
        <ViewC flex1 backgroundColor='#000' mid>
          <ButtonClose onPress={() => setVisible(false)} />
          {props.del && <ButtonDelete onPress={handleDeleteItem} />}
          <SwiperMedia
            onChangeIdCurrent={(e: number) => { }}
            styleTextBadge={{ color: '#fff' }}
            styleBox={{ backgroundColor: '#000' }}
            data={props?.data}
          />
        </ViewC>
      </Modal>
    )
  },
)
export default ShowVideoFull
const ButtonClose = ({ onPress, style, color = '#fff', size = 40 }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
      }}>
      <IconC name='close' color={color} size={size} />
    </TouchableOpacity>
  )
}
const ButtonDelete = ({ onPress, style, color = 'red', size = 40 }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
      }}>
      <IconC name='trash-outline' color={color} size={size} />
    </TouchableOpacity>
  )
}
