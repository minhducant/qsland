import React, { useState, useRef } from 'react'
import { TextInput, StyleSheet, TextInputProps } from 'react-native'
import { isString } from 'underscore'
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from 'react-native-masked-text'
export type Handle = {
  getValue?: Function
  focus?: Function
  clear?: Function
  setValue?: Function
}
export interface InputBasicProps extends TextInputProps {
  placeholder?: string
  valueInit?: string
  look?: boolean
}
export interface InputMaskProps extends InputBasicProps {
  type: 'money' | 'phone' | 'code6' | 'cccd' | 'meter' | 'date'
  options?: TextInputMaskOptionProp
  checkText?: (previous: string, next: string) => boolean
}
export interface InputRowsProps extends InputBasicProps {
  maxLengthTxt?: number
  initHeight?: number
}
export const InputMask = React.forwardRef<Handle, InputMaskProps>(
  (props, ref) => {
    React.useImperativeHandle(ref, () => ({
      ..._ref.current,
      setValue,
      getValue: () => {
        if (isString(value)) {
          let newValue = value.replace(/\s/g, '')
          if (type == 'date') newValue = formatDate(newValue)
          return newValue
        }
        return null
      },
      focus: () => _ref.current?.focus(),
      clear: () => setValue(''),
      clearValue: () => setValue(''),
    }))
    const [value, setValue] = useState(props.valueInit)
    const _ref = useRef<any>()
    const { type, placeholder, style, ...rest } = props
    const getConfig: any = () => {
      switch (type) {
        case 'money':
          return {
            type: 'money',
            keyboardType: 'number-pad'
          }
        case 'phone':
          return {
            type: 'custom',
            options: {
              mask: '9999 999 9999',
            },
            keyboardType: 'number-pad'
          }
        case 'code6':
          return {
            type: 'custom',
            options: {
              mask: '999999',
            },
            keyboardType: 'number-pad'
          }
        case 'cccd':
          return {
            type: 'custom',
            options: {
              mask: '999 999 999 999',
            },
            keyboardType: 'number-pad'
          }
        case 'meter':
          return {
            type: 'custom',
            options: {
              mask: '999999',
            },
            keyboardType: 'number-pad'
          }
        case 'date':
          return {
            type: 'custom',
            options: {
              mask: '99-99-9999',
            },
            keyboardType: 'number-pad'
          }
        default:
          return {
            type: 'money',
          }
      }
    }
    return (
      <TextInputMask
        ref={_ref}
        // type={type}
        {...getConfig()}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        {...defaultProps}
        style={[defaultStyle.input, style]}
        {...rest}
      />
    )
  },
)

export const InputBasic = React.forwardRef<Handle, InputBasicProps>(
  (props, ref) => {
    React.useImperativeHandle(ref, () => ({
      setValue,
      getValue: () => {
        if (value) value
        return null
      },
      focus: () => _ref.current?.focus(),
      clear: () => setValue(''),
      clearValue: () => setValue(''),
    }))
    const [value, setValue] = useState(props.valueInit)
    const _ref = useRef<any>()
    const { placeholder, style, ...rest } = props
    return (
      <TextInput
        ref={_ref}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[defaultStyle.input, style]}
        {...defaultProps}
        {...rest}
      />
    )
  },
)

export const InputRows = React.forwardRef((props: InputRowsProps, ref) => {
  React.useImperativeHandle(ref, () => ({
    setValue,
    getValue: () => value ?? null,
    focus: () => _input.current.focus(),
    clear: () => setValue(''),
    clearValue: () => setValue(''),
  }))
  const [value, setValue] = useState(props.valueInit)
  const [textareaHeight, setTextareaHeight] = useState<any>()
  const _input = useRef<any>()
  const _defaultHeight = props?.initHeight ? props?.initHeight : 50
  const { placeholder, style, ...rest } = props
  return (
    <TextInput
      ref={_input}
      placeholderTextColor={'gray'}
      style={[defaultStyle.input, { height: textareaHeight }, props?.style]}
      value={value}
      onChangeText={setValue}
      onContentSizeChange={({ nativeEvent: event }) =>
        setTextareaHeight(event.contentSize.height + _defaultHeight)
      }
      multiline
      textAlignVertical='top'
      placeholder={placeholder}
      {...defaultProps}
      {...rest}
    />
  )
})
const defaultStyle = StyleSheet.create({
  input: { color: '#000' },
})
const defaultProps: TextInputProps = {
  placeholderTextColor: '#bbb',
  autoCapitalize: 'none',
}
function formatDate(inputDate: string) {
  // Split the input date string into day, month, and year
  const parts = inputDate.split("-");

  // Create a new Date object with the year, month, and day in the correct order
  const dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

  // Get the year, month, and day from the date object
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Return the formatted date string in "YYYY-MM-DD" format
  return `${year}/${month}/${day}`;
}