import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native'
import Swiper from 'react-native-swiper'

import ItemBadge from './ItemBadge'
import VideoIOS from '../VideoBasic/VideoIOS'
import VideoBasic from '../VideoBasic'
import {Log} from '@utils'
import DoubleClicker from '@mylib/UIKit/DoubleClicker'
import {Block, IconC, ImageC, Touch} from '@mylib/UIKit'
const SwiperMedia = forwardRef((props: any, ref) => {
  const refArray: any = useRef()
  const refBadge: any = useRef()
  const idPrevious: any = useRef(0)
  const [media, setMedia] = useState<any[]>([])
  useEffect(() => {
    refArray.current = media.map((item, index) => {
      return createRef()
    })
    setMedia(props.data)
  }, [props.data])
  const [show, setShow] = useState(true)
  useImperativeHandle(ref, () => ({
    setShow (value: boolean) {
      setShow(value)
    },
    onPauseVideo () {
      onPauseVideo()
    },
  }))
  const onChangeIdCurrent = async (idCurrent: any) => {
    props.onChangeIdCurrent(idCurrent)
    // logInfo('*', '********onChangeIdCurrent', idCurrent)
    await refBadge.current.setValue(idCurrent)
    if (media[idPrevious.current].type === 'video') {
      refArray.current[idPrevious.current].current.pauseVideo()
    }
    if (media[idCurrent].type === 'video') {
      refArray.current[idCurrent].current.playVideo()
    }
    idPrevious.current = idCurrent
    return null
  }
  const onPauseVideo = async () => {
    // if (refArray.current) {
    //   if (refArray.current[idPrevious.current].current)
    //     refArray.current[idPrevious.current].current.pauseVideo()
    // }
    // Log.e('media', media)
    // if (media.length > 0) {
    //   // if()
    // refArray.current[0].current?.pauseVideo()
    // refArray.current[1].current?.pauseVideo()
    // }
    await setShow(false)
    await setShow(true)
  }
  return (
    <View
      style={[
        {
          alignItems: 'center',
          width: width,
          minHeight: props.heightSwiper,
          backgroundColor: '#ddd',
        },
        props?.styleBox,
      ]}>
      {/* {__DEV__ && <IconC name='home' onPress={onPauseVideo} />} */}
      <Swiper
        loop={false}
        style={{height: props.heightSwiper}}
        //   showsButtons={true}
        showsPagination={false}
        onIndexChanged={onChangeIdCurrent}
        index={0}>
        {show &&
          media.map((item, key) => (
            <DoubleClicker
              onClick={props.onPressItem}
              // activeOpacity={0.8}
              key={key}
              style={{alignItems: 'center'}}>
              {item.type === 'video' && (
                <>
                  {Platform.OS === 'ios' ? (
                    <VideoIOS
                      height={props.heightVideo}
                      width={props.widthVideo}
                      ref={refArray.current[key]}
                      index={key}
                      source={{uri: item.uri}}
                      repeat={false}
                    />
                  ) : (
                    <VideoBasic
                      height={props.heightVideo}
                      width={props.widthVideo}
                      ref={refArray.current[key]}
                      index={key}
                      source={{uri: item.uri}}
                      repeat={false}
                    />
                  )}
                  {props.showFull && (
                    <Block alignI='flex-end' positionA top={2} right={5}>
                      <IconC
                        size={16}
                        name='expand-outline'
                        color={'gray'}
                        onPress={() => {
                          setShow(false)
                          props.onShowFull ? props.onShowFull() : () => {}
                        }}
                      />
                    </Block>
                  )}
                </>
              )}
              {item.type === 'image' && (
                <Image
                  source={
                    item.uri !== ''
                      ? {
                          uri: item.uri,
                        }
                      : {
                          uri: 'https://en.hongngochospital.vn/wp-content/themes/hongngoc/images/no-image.jpg',
                        }
                  }
                  style={{
                    width: props.widthImage,
                    height: props.heightVideo + 40,
                    resizeMode: 'contain',
                  }}
                />
              )}
            </DoubleClicker>
          ))}
      </Swiper>
      {!props?.hideItemBadge && (
        <ItemBadge
          styleBadge={props?.styleBadge}
          styleTextBadge={props?.styleTextBadge}
          ref={refBadge}
          quantity={media.length}
        />
      )}
    </View>
  )
})
export default SwiperMedia
SwiperMedia.defaultProps = {
  heightVideo: 260,
  heightSwiper: 330,
  heightImage: 0,
  widthImage: 380,
}
const {width} = Dimensions.get('window')
