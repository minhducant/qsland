import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
interface Props extends TextInputProps {
  placeholder?: string
  valueInit?: string
  styleContainer?: StyleProp<ViewStyle>
  placeholderStyle?: StyleProp<TextStyle>
  placeholderViewStyle?: StyleProp<ViewStyle>
}
const AnimatedInput = ({ style, placeholder, placeholderTextColor = "gray", ...props }: Props, ref: any) => {
  const [inputHeight, setHeight] = useState<any>(null)
  const [placeholderWidth, setWidth] = useState<any>(null)
  const animation = useRef(new Animated.Value(0)).current
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 2],
  })
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 6],
  })
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  })
  const onFocus = () => animate(1)
  const onBlur = () => !value && animate(0)
  const animate = (val: any) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start()
  }
  const [value, setValue] = useState(props.valueInit)
  const input = useRef<TextInput>(null)
  React.useImperativeHandle(ref, () => ({
    getValue() {
      return value
    },
    focus() {
      input.current?.focus()
    },
    blur() {
      input.current?.blur()
    },
    clear() {
      setValue('')
    },
  }))
  useEffect(() => {
    if (props.valueInit) animate(1)
  }, [])
  return (
    <View
      style={[styles._container, props.styleContainer]}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      <View style={[{ height: inputHeight, }, styles._stylePlaceView, props.placeholderViewStyle]}>
        <Animated.Text
          style={[
            styles._stylePlaceText,
            { color: placeholderTextColor },
            { transform: [{ translateY }, { translateX }, { scale }] },
            props.placeholderStyle
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {placeholder}
        </Animated.Text>
      </View>
      <TextInput
        ref={input}
        style={[
          styles.input,
          props.multiline && { height: 100, textAlignVertical: 'top' },
          style,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChangeText={setValue}
        multiline={props.multiline}

        {...props}
      />
    </View>
  )
}
export default forwardRef(AnimatedInput)
const styles = StyleSheet.create({
  _container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginTop: 5,
  },
  input: {
    paddingHorizontal: 10,
  },
  _stylePlaceView: {
    position: 'absolute',
    justifyContent: 'center',
  },

  _stylePlaceText: {
    fontSize: 14,
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#999',
  },
})
