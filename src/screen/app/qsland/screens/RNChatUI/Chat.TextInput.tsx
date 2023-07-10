import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Keyboard,
  ViewProps,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  UIManager,
  LayoutAnimation,
  Animated,
  Image,
  ScrollView,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
const { width } = Dimensions.get('screen')
import { IconC } from './utils'
import * as Animatable from 'react-native-animatable'
import { useKeyboard } from '@react-native-community/hooks'
import { Log } from '@utils'
import { useMessage } from './hook'
import { AppImage } from '@assets/image'
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
//LayoutAnimation.easeInEaseOut()
export default function InputText() {

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        // Log.d('keyboardDidShow', e)
        // if (count.current == 0) { count.current++; return }
        if (e.isEventFromThisApp && e.duration !== 0 || Platform.OS == "android") {
          // // Platform.OS == "android" &&
          // setTimeout(() => {
          //   // inputRef.current?.setNativeProps({ multiline: true })
          //   setMultiline(true)
          // }, 1500);

          // Log.d('keyboardDidShow')
          LayoutAnimation.easeInEaseOut()
          setOption(i => ({ ...i, isTyping: true, isMenuLeft: false, isMenuBottom: false }))
          // inputRef.current?.focus()
        }
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      (e) => {
        LayoutAnimation.easeInEaseOut()

        setOption(i => ({ ...i, isTyping: false }))

        // Platform.OS == "android" && 
        // setTimeout(() => {
        //   setMultiline(false)
        //   // inputRef.current?.setNativeProps({ multiline: false })
        // }, 1500);
        Log.d('keyboardDidHide')
      },
    )
    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])
  const [option, setOption] = useState({
    isTyping: false,
    loading: false,
    isMenuLeft: false,
    isMenuBottom: false,
    editable: true

  })
  const [isLike, setIsLike] = useState(true)
  const inputRef = useRef<TextInput>(null)
  const [textareaHeight, setTextareaHeight] = useState<any>()
  const [value, setValue] = useState('')
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const count = useRef(0)
  function onCamera() {
    LayoutAnimation.easeInEaseOut()
    Keyboard.dismiss()
    setOption(i => ({ ...i, isMenuBottom: true, editable: false }))
  }
  function onRecord() {
    LayoutAnimation.easeInEaseOut()
    Keyboard.dismiss()
    setOption(i => ({ ...i, isMenuBottom: true }))
  }
  function onLibrary() {
    LayoutAnimation.easeInEaseOut()
    Keyboard.dismiss()
    setOption(i => ({ ...i, isMenuBottom: true }))
  }
  function onSend() { }
  function openMenuLeft() {

    if (option.isMenuLeft) {
      LayoutAnimation.easeInEaseOut()
      setOption(i => ({ ...i, isMenuBottom: false, isMenuLeft: false, }))

    } else {
      LayoutAnimation.easeInEaseOut()
      setOption(i => ({ ...i, isMenuLeft: true, }))
    }
  }
  function onChangeText(e: any) {
    // LayoutAnimation.easeInEaseOut()
    setValue(e)
    if (!option.isTyping) setOption(i => ({ ...i, isTyping: true }))
    if (e.length > 0) {
      setIsLike(false)
    } else setIsLike(true)
  }
  // Log.d('isTyping', option.isTyping)
  function onPressIn() {
    if (Platform.OS == "android") {
      LayoutAnimation.easeInEaseOut()
      setOption(i => ({ ...i, isMenuBottom: false }))
    }
    else {
      LayoutAnimation.easeInEaseOut()
      setOption(i => ({ ...i, isMenuBottom: false }))
      setTimeout(() => {
        setOption(i => ({ ...i, editable: true }))
        inputRef.current?.focus()
      }, 350);
    }
  }
  const { message, setMessage } = useMessage()
  Log.d('message', message)
  return (

    <>

      {message !== null &&
        <View style={{ marginLeft: 10, marginBottom: 5 }}>
          <Text  >
            <Text style={{ fontSize: 18, fontWeight: '300', color: 'gray' }}>{'Đang trả lời: '}</Text>
            <Text style={{ fontSize: 20, fontWeight: '600', color: 'blue' }}>{message?.title}</Text>
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'gray' }}>{' * '}</Text>
            <Text onPress={() => setMessage(null, 'del')} style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>{'Huỷ'}</Text>
          </Text>
        </View>
      }
      {images.length != 0 &&
        <View style={{ marginLeft: 10, marginBottom: 5, borderTopWidth: 1, paddingTop: 5 }}>
          <ScrollView horizontal>
            <Image source={AppImage('logo_admin')} style={{ width: 100, height: 100, backgroundColor: 'green', borderRadius: 10, marginRight: 5 }} />
            <Image source={AppImage('logo_admin')} style={{ width: 100, height: 100, backgroundColor: 'green', borderRadius: 10, marginRight: 5 }} />
            <Image source={AppImage('logo_admin')} style={{ width: 100, height: 100, backgroundColor: 'green', borderRadius: 10, marginRight: 5 }} />
            <Image source={AppImage('logo_admin')} style={{ width: 100, height: 100, backgroundColor: 'green', borderRadius: 10, marginRight: 5 }} />
          </ScrollView>
        </View>
      }
      <View style={[styles.container, { height: textareaHeight < HEIGHT ? HEIGHT : textareaHeight, maxHeight: option.isTyping ? 140 : HEIGHT }]}>
        <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
          {option.isMenuLeft && (
            <>
              <IconButton icon='camera' onPress={onCamera} />
              <IconButton icon='videocam' onPress={onRecord} />
              <IconButton icon='image' onPress={onLibrary} />
            </>
          )}
          <IconButton

            icon={option.isMenuLeft ? 'chevron-back-outline' : 'chevron-forward'}
            onPress={openMenuLeft}
          />
        </View>

        <View style={[styles.boxInput,]}>
          <TextInput
            editable={option.editable}
            onPressIn={onPressIn}
            textAlignVertical='center'
            value={value}
            placeholder='Aa'
            ref={inputRef}
            placeholderTextColor={'#bbb'}
            multiline//={multiline}
            style={[styles.input,
            {
              height: textareaHeight < HEIGHT ? HEIGHT : textareaHeight,
              maxHeight: option.isTyping ? 140 : HEIGHT,
              paddingTop: Platform.OS == "ios" ? 16 : undefined,
            }]}
            // onPressIn={onPressInInput}
            onChangeText={onChangeText}
            onKeyPress={e => {
              if (e.nativeEvent.key == 'Enter') {
                // Log.e('key.event', e.nativeEvent.key)
                // __DEV__ && onSend()
              }
            }}
            onContentSizeChange={({ nativeEvent: event }) => {
              // Log.d('event.contentSize.height', event.contentSize.height)
              setTextareaHeight(event.contentSize.height)
              // inputRef.current?.setNativeProps({ style: { height: event.contentSize.height + _defaultHeight } })
              // inputViewRef.current?.setNativeProps({ style: { height: event.contentSize.height + _defaultHeight } })
            }}
          />
          <View
            style={{
              justifyContent: 'flex-end',
              height: '100%',
            }}>
            {value !== "" && <IconC onPress={() => setValue('')} style={styles.iconHappy} name='close-outline' color={'#fff'} />}
          </View>
        </View>
        {!option.loading && (
          <IconButton
            // show={!isLike}
            style={styles.icon}
            icon={'send'}
            onPress={onSend}
          />
        )}
        {option.loading && (
          <TouchableOpacity style={styles.icon}>
            <ActivityIndicator size={20} color={'red'} />
          </TouchableOpacity>
        )}
      </View>
      {/* {option.isMenuBottom && */}
      <View
        style={{ height: option.isMenuBottom ? 300 : 0, backgroundColor: 'red', }}
      ></View>
      {/* } */}
    </>
  )
}
const HEIGHT = 50
const PAD = 2
const styles = StyleSheet.create({

  boxMain: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#eee',
    minHeight: HEIGHT,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    minHeight: HEIGHT,
    backgroundColor: '#ddd',
    // paddingVertical: PAD,
  },
  input: {
    flex: 1,
    paddingLeft: 20,
    color: '#000',
    backgroundColor: '#eee',
  },
  boxInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 20,
    marginLeft: 5,
    overflow: 'hidden',
    // paddingVertical: 5,
    // borderBottomWidth: 5
  },
  icon: { paddingLeft: 10, paddingBottom: 5 },
  iconLeft: { paddingHorizontal: 5 },
  iconHappy: { padding: 5 },
})
const IconButton = ({
  onPress,
  show = true,
  icon = 'camera',
  style = styles.iconLeft,
  typeIcon = 'Ionicons',
}: {
  onPress: () => void
  icon: string
  style?: ViewProps['style']
  typeIcon?: any
  show?: boolean
}) => {
  if (!show) return null
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <IconC type={typeIcon} name={icon} size={25} color={'red'} />
    </TouchableOpacity>
  )
}
