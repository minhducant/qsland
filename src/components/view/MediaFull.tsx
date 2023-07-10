import {TouchableOpacity, Image, Modal} from 'react-native'
import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react'
import {IconC, Block} from '@mylib'
import {Log, uriImg} from '@utils'
import Swiper from 'react-native-swiper'
import SwiperMedia from './SwiperMedia'
import {screen_height, screen_width} from '../index'
const ViewFullScreen = forwardRef(
  (props: {data: Array<any>; onClose?: any}, ref: any) => {
    if (!props.data) return null
    if (!Array.isArray(props.data)) return null
    const [visible, setVisible] = useState(false)
    useImperativeHandle(ref, () => ({
      visible: (value: any) => {
        setVisible(value)
      },
      ...refSwiper.current,
    }))
    const refSwiper = useRef<any>()
    return (
      <Modal visible={visible}>
        <Block flex1 backgroundColor='#000' mid>
          <ButtonClose
            onPress={() => {
              Log.d('res', Object.keys(refSwiper.current))
              setVisible(false)
              props.onClose ? props.onClose() : () => {}
            }}
          />
          <SwiperMedia
            ref={refSwiper}
            data={props?.data}
            onChangeIdCurrent={(e: number) => {}}
            styleTextBadge={{color: '#fff'}}
            styleBox={{backgroundColor: '#000'}}
            width={screen_width}
            heightVideo={screen_height * 0.7}
            heightImage={screen_height * 0.8}
            heightSwiper={screen_height * 0.8}
          />
        </Block>
      </Modal>
    )
  },
)
export default ViewFullScreen
const ButtonClose = ({onPress, style, color = '#fff', size = 40}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 2,
      }}>
      <IconC name='close' color={color} size={size} />
    </TouchableOpacity>
  )
}
