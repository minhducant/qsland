import React, {useState, forwardRef, useRef} from 'react'
import {
  TextStyle,
  TextInput,
  TextInputProps,
  StyleProp,
  StyleSheet,
} from 'react-native'
interface T_InputRows extends TextInputProps {
  valueInit?: string
  styleInput?: StyleProp<TextStyle>
  maxLengthTxt?: number
  initHeight?: number
}
const InputRows = forwardRef((props: T_InputRows, ref) => {
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
    <TextInput
      ref={_input}
      placeholderTextColor={'gray'}
      style={[styles.default, {height: textareaHeight}, props?.styleInput]}
      value={value}
      onChangeText={setValue}
      onContentSizeChange={({nativeEvent: event}) =>
        setTextareaHeight(event.contentSize.height + _defaultHeight)
      }
      multiline
      textAlignVertical='top'
      {...props}
    />
  )
})
export default InputRows
const styles = StyleSheet.create({
  default: {backgroundColor: '#eee', padding: 10, borderRadius: 5},
})
