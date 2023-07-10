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
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
const { width } = Dimensions.get('screen')
import * as Animatable from 'react-native-animatable'
import { useKeyboard } from '@react-native-community/hooks'
import { Log } from '@utils'
import { IconC } from '../index'

export default function InputText() {

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     (e) => {
  //       if (count.current == 0) { count.current++; return }
  //       if (e.isEventFromThisApp && e.duration !== 0 || Platform.OS == "android") {
  //         // Platform.OS == "android" &&
  //         setTimeout(() => {
  //           // inputRef.current?.setNativeProps({ multiline: true })
  //           setMultiline(true)
  //         }, 1500);

  //         Log.d('keyboardDidShow')
  //         setIsTyping(true)
  //         // inputRef.current?.focus()
  //       }
  //     },
  //   )
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     (e) => {
  //       setIsTyping(false)

  //       // Platform.OS == "android" && 
  //       setTimeout(() => {
  //         setMultiline(false)
  //         // inputRef.current?.setNativeProps({ multiline: false })
  //       }, 1500);
  //       Log.d('keyboardDidHide')
  //     },
  //   )
  //   return () => {
  //     keyboardDidHideListener.remove()
  //     keyboardDidShowListener.remove()
  //   }
  // }, [])

  const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()
  useEffect(() => {
    if (keyboardShown) {
      Log.d1('keyboardDidShow', { keyboardShown, keyboardHeight, coordinates })
    } else {
      Log.d1('keyboardDidHide', { keyboardShown, keyboardHeight, coordinates })
    }
  }, [keyboardShown])
  const [isTyping, setIsTyping] = useState(false)
  const [isLike, setIsLike] = useState(true)
  const [waitSend, setWaitSend] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const inputViewRef = useRef<View>(null)
  const [multiline, setMultiline] = useState(false)
  const [textareaHeight, setTextareaHeight] = useState<any>()
  const [value, setValue] = useState('')
  const _defaultHeight = 50
  const count = useRef(0)
  function handleCamera() { }
  function handleRecord() { }
  function handleLibrary() { }
  function onSend() { }
  function handleOpenTabLeftSelect() { setIsTyping(false) }
  function handleOnChangeText(e: any) {
    setValue(e)
    if (!isTyping) setIsTyping(true)
    if (e.length > 0) {
      setIsLike(false)
    } else setIsLike(true)
  }
  // Log.d('textareaHeight,', textareaHeight, textareaHeight < HEIGHT ? HEIGHT : textareaHeight)
  return (
    // <Animatable.View
    //   animation='fadeInUp'
    //   useNativeDriver
    //   direction='alternate'
    //   duration={500}
    //   style={[styles.boxMain, { width }]}>

    <View style={[styles.container, { height: textareaHeight < HEIGHT ? HEIGHT : textareaHeight, maxHeight: isTyping ? 140 : HEIGHT }]}>
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
          textAlignVertical='center'
          value={value}
          placeholder='Aa'
          ref={inputRef}
          placeholderTextColor={'#bbb'}
          multiline={multiline}
          style={[styles.input, { height: textareaHeight < HEIGHT ? HEIGHT : textareaHeight, maxHeight: isTyping ? 140 : HEIGHT }]}
          // onPressIn={handlePressInInput}
          onChangeText={handleOnChangeText}
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
          }
          }
        />
        <View
          style={{
            justifyContent: 'flex-end',
            height: '100%',
          }}>
          <IconC style={styles.iconHappy} name='happy-outline' />
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
          <ActivityIndicator size={20} color={'red'} />
        </TouchableOpacity>
      )}
    </View>
    // </Animatable.View>
  )
}
const HEIGHT = 50
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
    backgroundColor: 'green',
  },
  input: {
    flex: 1,
    paddingLeft: 20,
    color: '#000',
    backgroundColor: 'pink',
  },
  boxInput: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
    borderRadius: 20,
    marginLeft: 5,
    // overflow: 'hidden'
  },
  icon: { paddingLeft: 10, paddingBottom: 5 },
  iconLeft: { paddingHorizontal: 5 },
  iconHappy: { padding: 5 },
})
export const IconButton = ({
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
