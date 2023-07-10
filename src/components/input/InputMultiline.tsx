import React, { useState, forwardRef } from 'react'
import { TextStyle, TextInput, TextInputProps, StyleProp } from 'react-native'
import { useRef } from 'react'
import { AppLang } from '@assets/langs'

type Props = {
  placeholder?: string
  valueInit?: string
  look?: boolean
  style?: StyleProp<TextStyle>
  props?: any
  disabled?: boolean
  paddingBottom?: number
}
export const InputMultiline = forwardRef((props: Props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (v: any) => setValue(v),
    focus: () => _TextInput.current.focus(),
    clear: () => setValue(''),
  }))
  const [value, setValue] = useState(props.valueInit)
  const [textareaHeight, setTextareaHeight] = useState<any>()
  const _TextInput = useRef<any>()
  return (
    <TextInput
      ref={_TextInput}
      placeholder={props?.placeholder || AppLang('nhap_noi_dung')}
      placeholderTextColor={'gray'}
      style={[{ height: textareaHeight, backgroundColor: '#fff' }, props?.style]}
      value={value}
      onChangeText={(e) => !props?.disabled && setValue(e)}
      onContentSizeChange={({ nativeEvent: event }) =>
        setTextareaHeight(event.contentSize.height + (props?.paddingBottom || 50))
      }
      multiline
      textAlignVertical='top'
      {...props?.props}
    />
  )
})
