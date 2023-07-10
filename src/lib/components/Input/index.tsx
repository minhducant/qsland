import React, { useState } from 'react'
import {
  TextStyle,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  View,
  ViewProps,
} from 'react-native'
import { useRef } from 'react'
export interface InputRef {
  getValue: () => any
  setValue: (value: string) => any
  focus: () => void
  blur: () => void
  clear: () => void
}
export interface InputProps extends TextInputProps {
  placeholder?: string
  valueInit?: string
  style?: StyleProp<TextStyle>
}
export const Input = React.forwardRef<InputRef, InputProps>(
  ({ style, ...props }, ref) => {
    React.useImperativeHandle(ref, () => ({
      ...inputRef.current,
      getValue: () => value,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear() {
        setValue('')
      },
      setValue(value: string) {
        setValue(value)
      },
    }))
    const [value, setValue] = useState(props.valueInit)
    const inputRef = useRef<TextInput>(null)
    return (
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        placeholder={props.placeholder}
        style={[styles.input, style]}
        {...props}
      />
    )
  },
)
Input.defaultProps = {
  placeholder: 'placeholder',
  valueInit: '',
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#eee',
    color: '#000'
  },
})
interface T_InputRows extends TextInputProps {
  valueInit?: string
  styleInput?: StyleProp<TextStyle>
  styleContainer?: ViewProps['style']
  styleIcon?: ViewProps['style']
  maxLengthTxt?: number
  initHeight?: number
  hiddenIcon?: boolean
  onClose?: () => void
  nameIcon?: string
}
import Ionicons from 'react-native-vector-icons/Ionicons'

export const InputRows = React.forwardRef(({ style, styleContainer, ...props }: T_InputRows, ref) => {
  React.useImperativeHandle(ref, () => ({
    getValue: () => value,
    focus: () => _input.current.focus(),
    clear: () => setValue(''),
  }))
  const [value, setValue] = useState(props.valueInit)
  const [textareaHeight, setTextareaHeight] = useState<any>()
  const _input = useRef<any>()
  const _defaultHeight = props?.initHeight ? props?.initHeight : 50
  return (
    <View style={[{}, styleContainer]}>
      {!props.hiddenIcon &&
        <Ionicons onPress={props.onClose}
          name={props.nameIcon ?? "close-circle-outline"}
          size={20}
          style={[{ position: 'absolute', right: 0, zIndex: 10 }, props.styleIcon]}
        />}
      <TextInput
        ref={_input}
        placeholderTextColor={'gray'}
        style={[styles2.default, { height: textareaHeight }, style]}
        value={value}
        onChangeText={setValue}
        onContentSizeChange={({ nativeEvent: event }) =>
          setTextareaHeight(event.contentSize.height + _defaultHeight)
        }
        multiline
        textAlignVertical='top'
        {...props}
      />
    </View>
  )
})

const styles2 = StyleSheet.create({
  default: { backgroundColor: '#eee', padding: 10, borderRadius: 5, color: '#000' },
})
