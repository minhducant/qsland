import {
  Modal,
  Animated,
  StyleProp,
  ViewStyle,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Platform,
  RefreshControl,
  ViewProps,
  TextProps,
  Alert
} from 'react-native'
import React, { useRef, useState } from 'react'
import { Block, IconC, Touch } from '@mylib'
import { LayoutApp } from '@components'
import { screen_width } from '../index'

export type ActionSheetProps = {
  textCancel?: any
  options: any
  styleBox?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  onPressButton?: (item: any) => any
  onCancel?: () => any
  onOpenStart?: () => any
  onOpenFinish?: () => any
  onCloseFinish?: () => any
  onCloseStart?: () => any
  getTitle?: (item: any) => string
  textStyle?: TextProps['style']
  cancelStyle?: any
  containerStyle?: any
  keyValue?: string
  autoClose?: boolean
  refreshing?: boolean
  onRefresh?: () => void
  iconProps?: {
    show?: boolean
    style?: ViewProps['style'],
    funcProps: (item: any) => any
  }
}
const ActionSheetIos = React.forwardRef(
  (
    {
      options = [],
      onPressButton,
      onCancel,
      textCancel = "cancel",
      styleBox,
      onOpenStart,
      onCloseStart,
      onOpenFinish,
      onCloseFinish,
      keyValue = 'name',
      getTitle,
      textStyle,
      cancelStyle,
      containerStyle,
      buttonStyle,
      refreshing = false,
      onRefresh,
      autoClose = true,
      iconProps = { funcProps: () => { } }
    }: ActionSheetProps,
    ref,
  ) => {
    React.useImperativeHandle(ref, () => ({
      open: () => fadeIn(),
      close: () => fadeOut(),
    }))
    const [visible, setVisible] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current

    const fadeIn = async () => {
      if (typeof onOpenStart == 'function') await onOpenStart()
      await setVisible(true)
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      }, 100)
      typeof onOpenFinish == 'function' && onOpenFinish()
    }

    const fadeOut = async () => {
      if (typeof onCloseStart == 'function') await onCloseStart()
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false)
        if (typeof onCloseFinish == 'function') onCloseFinish()
      })
    }
    const _renderTitle = (item: any) => {
      if (typeof getTitle == "function") {
        return getTitle(item)
      }
      return item[keyValue]
    }
    return (
      <Modal visible={visible} transparent animationType='slide' >
        <LayoutApp
          forceInset={{ vertical: 'never' }}
          forceInsetBot={{ vertical: 'never', bottom: 'always' }}
          styleBot={{ backgroundColor: '#00000079', opacity: fadeAnim, paddingBottom: Platform.OS == "android" ? 8 : 0 }}
          style={{ backgroundColor: 'transparent' }}>
          <Block flex1 justifyC='flex-end' onPress={fadeOut}>
            <Touch
              positionA
              onPress={fadeOut}
              activeOpacity={1}
              styleBox={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            </Touch>
            <Block
              overH
              borderR={14}
              minH={(options.length < 8) ? (options.length * heightButton) : (8 * heightButton)}
              styleBox={styleBox}
              marH={8}
              bg={backgroundColor}>
              <ScrollView
                scrollEnabled={options.length > 3 ? true : false}
                style={{ flex: 1 }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                {options.map((item, index) => (
                  <TouchableHighlight
                    key={index}
                    style={[styles.button, {}, buttonStyle]}
                    activeOpacity={activeOpacity}
                    underlayColor={underlayColor}
                    onPress={() => {
                      typeof onPressButton == "function" && onPressButton(item)
                      autoClose && fadeOut()
                    }}
                    onLongPress={() => { Alert.alert(_renderTitle(item), '', []) }}
                  >
                    <>
                      <Text style={[styles.text, { paddingHorizontal: iconProps?.show ? 30 : 0 }, textStyle]} numberOfLines={1}>
                        {_renderTitle(item)}
                      </Text>
                      {iconProps?.show &&
                        <IconC
                          name={iconProps?.funcProps ? iconProps?.funcProps(item)?.name : 'home'}
                          size={iconProps?.funcProps ? iconProps?.funcProps(item)?.size : 23}
                          color={iconProps?.funcProps ? iconProps?.funcProps(item)?.color : 'gray'}
                          style={[{ position: 'absolute', right: 10 }, iconProps?.style]}
                        />
                      }
                    </>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </Block>
            <TouchableHighlight
              style={styles.buttonCancel}
              activeOpacity={activeOpacity}
              underlayColor={underlayColor}
              onPress={() => typeof onCancel == "function" && onCancel()}>
              <Text style={[styles.text, { color: '#f23c31', fontWeight: '700', fontSize: 19 }]}>
                {textCancel}
              </Text>
            </TouchableHighlight>
          </Block>
        </LayoutApp>
      </Modal>
    )
  },
)
export default ActionSheetIos
const backgroundColor = '#F8FCFCF4'
const underlayColor = '#DDDDDD'
const heightButton = screen_width * 0.14
const activeOpacity = 0.6
const styles = StyleSheet.create({
  button: {
    height: heightButton,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#cbcccb',
  },
  buttonCancel: {
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 8,
    height: heightButton,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    color: '#007aff',
  }
})