import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Keyboard,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Log } from '@utils'
import { useKeyboard } from '@react-native-community/hooks'
// import BottomSheet from 'reanimated-bottom-sheet'
import * as Animatable from 'react-native-animatable'

import { uriImg } from '@utils'
import {
  FlatListLibrary,
  HeaderBottomSheet,
  HeaderScrollImage,
  IconButton,
  TextTag,
  ViewEmojiSelector,
} from './ComponentsInput'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { AppColor } from '@assets/colors'
import { isArray } from 'underscore'
import { checkPesCamera } from '@utils/checkPermission'
import {
  checkCamera,
  checkRecordVideo,
  checkUseLibrary,
} from '@utils/prermission'

const BoxInput = React.forwardRef<any, any>(
  ({ onSend, hidePaddingBottom }: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      getValue() {
        return value
      },
      getMedia() {
        return dataSelect
      },
      getIsLike() {
        return isLike
      },
      focus() {
        refChat.current.focus()
      },
      clear() {
        setValue('')
        setDataSelect([])
      },
      setWaitSend(value: any) {
        setWaitSend(value)
      },
    }))
    const refChat: any = useRef()
    const refModal: any = useRef()
    const sheetOrder: any = useRef()
    const [isTyping, setIsTyping] = useState(false)
    const [isLike, setIsLike] = useState(true)
    const [isChoseImage, setIsChoseImage] = useState(false)
    const [dataMedia, setDataMedia] = useState<any[]>([])
    const [dataSelect, setDataSelect] = useState<any[]>([])
    const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()
    const [snapCurrent, setSnapCurrent] = useState(2)
    const [waitSend, setWaitSend] = useState(false)
    const [value, setValue] = useState('')
    const onEventKeyShow = async () => {
      await setIsTyping(true)
      await setIsChoseImage(false)
      // await sheetOrder.current.snapTo(2)
      await setSnapCurrent(2)
      await refChat.current.focus()
      await setValue(prev => prev + ' ')
      await setValue(prev => prev.slice(0, prev.length - 1))
    }
    useEffect(() => {
      if (keyboardShown) {
        onEventKeyShow()
        // setIsTyping(true)
        // setIsChoseImage(false)
        // sheetOrder.current.snapTo(2)
        // setSnapCurrent(2)

        // setTimeout(() => {
        //   refChat.current.focus()
        //   setValue('Aa')
        //   setValue('')
        //   // refChat.current.setNativeProps({editable: false})
        // }, 100)
      } else {
        setIsTyping(false)
      }
    }, [keyboardShown])

    useEffect(() => {
      hasAndroidPermission()
    }, [])
    useEffect(() => {
      if (dataSelect.length > 0) {
        setIsLike(false)
      } else setIsLike(true)
    }, [dataSelect])
    // Log.e('dataSelect', dataSelect)
    const _onScrollFlat = (evt: any) => {
      const { nativeEvent } = evt
      // console.log('nativeEvent.velocity.y', nativeEvent.velocity.y)
      if (nativeEvent.velocity.y > 0) {
        if (evt.nativeEvent.contentOffset.y > 100) {
          // Log.e('_onScrollFlat', 1)
          sheetOrder.current.snapTo(0)
          setSnapCurrent(0)
        }
      } else {
        if (
          nativeEvent.velocity.y < -10 &&
          evt.nativeEvent.contentOffset.y < 5
        ) {
          // Log.e('_onScrollFlat', 2)
          sheetOrder.current.snapTo(1)
          setSnapCurrent(1)
        }
      }
    }
    const handleCamera = async () => {
      let data = await checkPesCamera()
      checkCamera()
      Log.e('handleCamera', data)
      let options: any = {
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
        selectionLimit: 5,
        maxWidth: 400, //kich thuoc anh
        maxHeight: 400, //kich thuoc anh
        quality: 1,
        presentationStyle: 'fullScreen',
      }
      launchCamera(options, (e: any) => {
        Log.d('launchCamera-e', e)
        if (e?.assets) {
          setDataSelect((state: any) => {
            return [...state, ...e.assets]
          })
        }
      }).catch(e => Log.e(e))
    }
    const handleLibrary = () => {
      checkUseLibrary()
      let options: any = {
        mediaType: 'mixed',
        includeBase64: false,
        includeExtra: true,
        selectionLimit: 5,
        maxWidth: 400, //kich thuoc anh
        maxHeight: 400, //kich thuoc anh
        quality: 1,
        presentationStyle: 'fullScreen',
      }
      launchImageLibrary(options, (e: any) => {
        Log.d('onLibraryImg', e)
        if (e?.assets) {
          setDataSelect((state: any) => {
            return [...state, ...e.assets]
          })
        }
      }).catch(e => Log.e(e))
      return
      // Keyboard.dismiss()
      // setIsChoseImage(true)
      // sheetOrder.current.snapTo(1)
      // setSnapCurrent(1)
      // CameraRoll.getPhotos({
      //   first: 50,
      //   assetType: 'All',
      // })
      //   .then(r => {
      //     Log.e('Photos', r)
      //     if (r && r?.edges) {
      //       setDataMedia(r.edges)
      //     }
      //   })
      //   .catch(err => {
      //     Log.e('catch', err)
      //   })
    }
    const handleRecord = () => {
      checkRecordVideo()
      let options: any = {
        mediaType: 'video',
        includeBase64: false,
        includeExtra: true,
        selectionLimit: 5,
        maxWidth: 400, //kich thuoc anh
        maxHeight: 400, //kich thuoc anh
        quality: 1,
        presentationStyle: 'fullScreen',
      }
      launchCamera(options, (e: any) => {
        Log.d('launchCamera-e', e)
        if (e?.assets) {
          setDataSelect((state: any) => {
            return [...state, ...e.assets]
          })
        }
      }).catch(e => Log.e('handleRecord', e))
    }
    const handleEmoji = () => {
      refModal.current.open()
    }
    const handleOnEmojiSelected = async (e: any) => {
      await refModal.current.close()
      await setValue(prev => prev + e)
      await setIsLike(false)
      await refChat.current.focus()
    }
    const handleCloseSelectLibrary = () => {
      if (snapCurrent === 1) {
        sheetOrder.current.snapTo(2)
        setIsChoseImage(false)
        refChat.current.focus()
      } else {
        sheetOrder.current.snapTo(1)
        setSnapCurrent(1)
      }
    }
    const handleFullScreenLibrary = () => {
      sheetOrder.current.snapTo(0)
      setSnapCurrent(0)
    }
    const handleRemoveImageSelect = (index: any) => {
      setDataSelect((state: any) => {
        return state.filter((item: any, _index: number) => _index !== index)
      })
    }
    const handleOnSelectImage = (item: any) => {
      setDataSelect((state: any) => {
        return [...state, item]
      })
    }
    const handleOpenTabLeftSelect = () => {
      setIsTyping(false)
    }
    const handlePressInInput = () => {
      setIsTyping(true)
    }
    const handleOnChangeText = (e: any) => {
      setValue(e)
      if (!isTyping) setIsTyping(true)
      if (dataSelect.length > 0) return setIsLike(false)
      if (e.length > 0) {
        setIsLike(false)
      } else setIsLike(true)
    }
    // Log.d('isTyping', isTyping)
    // Log.d('isLike', isLike)

    // Log.d('keyboardShown', keyboardShown)
    // Log.d('keyboardHeight', keyboardHeight)
    const fmBottom = () => {
      if (hidePaddingBottom) {
        return Platform.OS === 'ios' ? keyboardHeight : 0
      }
      if (keyboardShown) return keyboardHeight
      return Platform.OS === 'ios' ? 0 : 0
    }
    const styleP: any = {
      bottom: fmBottom(),
      position: 'absolute',
      left: 0,
      right: 0,
    }

    return (
      // <Animatable.View
      //       key={j}
      //       animation='fadeInUp'
      //       delay={j * 80}
      //       useNativeDriver></Animatable.View>
      <Animatable.View
        animation='fadeInUp'
        useNativeDriver
        delay={100}
        style={[styles.boxMain, keyboardShown && { ...styleP }]}>
        <HeaderScrollImage
          styleBox={{
            minHeight: keyboardShown ? 0 : dataSelect.length > 0 ? 150 : 0,
          }}
          dataSelect={dataSelect}
          onClose={handleRemoveImageSelect}
        />
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
            {!isTyping && (
              <>
                <IconButton icon='camera' onPress={handleCamera} />
                <IconButton icon='videocam' onPress={handleRecord} />
                <IconButton icon='image' onPress={handleLibrary} />
              </>
            )}
            <IconButton
              show={isTyping}
              icon='chevron-forward'
              onPress={handleOpenTabLeftSelect}
            />
          </View>
          <View style={styles.boxInput}>
            <TextInput
              value={value}
              ref={refChat}
              placeholder='Aa'
              placeholderTextColor={'#bbb'}
              multiline
              style={[styles.input, { maxHeight: isTyping ? 140 : 40 }]}
              onPressIn={handlePressInInput}
              onChangeText={handleOnChangeText}
              onKeyPress={e => {
                if (e.nativeEvent.key == 'Enter') {
                  Log.e('key.event', e.nativeEvent.key)
                  __DEV__ && onSend()
                }
              }}
            />
            <TextTag />
            <View
              style={{
                justifyContent: 'flex-end',
                height: '100%',
                // backgroundColor: 'red',
              }}>
              <IconButton
                style={styles.iconHappy}
                icon='happy-outline'
                onPress={handleEmoji}
              />
            </View>
          </View>
          {!waitSend && (
            <>
              <IconButton
                show={!isLike}
                style={styles.icon}
                icon={'send'}
                onPress={onSend}
              />
              <IconButton
                show={isLike}
                typeIcon='AntDesign'
                style={styles.icon}
                icon='like1'
                onPress={onSend}
              />
            </>
          )}
          {waitSend && (
            <TouchableOpacity style={styles.icon}>
              <ActivityIndicator size={20} color={AppColor('primary')} />
            </TouchableOpacity>
          )}

        </View>
      </Animatable.View>
    )
  },
)
export default BoxInput
const styles = StyleSheet.create({
  boxMain: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#eee',
    minHeight: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    minHeight: 50,
    backgroundColor: '#fff',
    padding: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 20,
    color: '#000',
  },
  boxInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEECEC',
    borderRadius: 20,
    marginLeft: 5,
  },
  icon: { paddingLeft: 10, paddingBottom: 5 },
  iconLeft: { paddingHorizontal: 5 },
  iconHappy: { padding: 5 },
})
async function hasAndroidPermission() {
  // const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  // const permission2 = PermissionsAndroid.PERMISSIONS.CAMERA
  // const hasPermission = await PermissionsAndroid.check(permission)
  // const hasPermission2 = await PermissionsAndroid.check(permission2)
  // if (hasPermission && hasPermission2) {
  //   return true
  // }
  // const status = await PermissionsAndroid.request(permission)
  // const status2 = await PermissionsAndroid.request(permission2)
  // return status === 'granted'
}
