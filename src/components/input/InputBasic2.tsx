import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  LegacyRef,
} from 'react'
import {
  TextStyle,
  ViewStyle,
  TextProps,
  ColorValue,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { useRef } from 'react'
import { IconC } from '@mylib'
import { AppColor } from '@assets/colors'

import { AppLang, } from '@assets/langs'
import { isEmpty } from 'underscore';
export type CountdownHandle = {
  getValue: () => void
  check?: () => void
  focus?: () => void
  clear?: () => void
}

interface Props extends TextInputProps {
  placeholder?: string
  valueInit?: string
  look?: boolean
  styleBox?: StyleProp<ViewStyle>
  icon?: any
  forgot?: boolean
  onForgot?: any
}

const InputCore = React.forwardRef<CountdownHandle, Props>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    check() {
      alert(value)
    },
    getValue() {
      return value
    },
    setValue(value: any) {
      if (!isEmpty(value)) setValue(value)
    },
    focus() {
      refCore.current.focus()
    },
    clear() {
      setValue('')
    },
  }))
  const [value, setValue] = useState(props.valueInit)
  const [look, setLook] = useState(props.look ? true : false)
  const refCore: any = useRef()
  return (
    <View style={[styles.box, props.styleBox]}>
      {props?.icon && <IconC name={props?.icon} size={22} color={'gray'} />}
      <TextInput
        ref={refCore}
        value={value}
        onChangeText={setValue}
        placeholder={props.placeholder}
        style={styles.input}
        secureTextEntry={look}
        autoCapitalize={'none'}
        placeholderTextColor={'#bbb'}
        {...props}
      />
      {props.look && (
        <TouchableOpacity
          onPress={() => setLook(prev => !prev)}
          style={[styles.hind, { right: props?.forgot ? 65 : 20 }]}>
          <IconC
            name={look ? 'eye-off-outline' : 'eye-outline'}
            color='#696969'
            size={22}
          />
        </TouchableOpacity>
      )}
      {props?.forgot && (
        <TouchableOpacity
          onPress={props?.onForgot}
          style={[
            styles.hind,
            {
              right: 10,
              borderLeftWidth: 0.8,
              borderColor: '#ddd',
              paddingLeft: 5,
            },
          ]}>
          <Text style={{ color: AppColor('primary') }}>{`${AppLang(
            'quen',
          )}?`}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
})
export default InputCore
InputCore.defaultProps = {
  placeholder: 'placeholder',
  look: false,
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    color: '#696969',
    fontSize: 16,
    fontWeight: '500',
    width: '90%',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,

    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  hind: {
    position: 'absolute',
    right: 20,
  },
})
export const TextBox = (props: any) => {
  return (
    <View style={[styles.box, props.styleBox]}>
      <Text style={styles.input}>{props?.value}</Text>
    </View>
  )
}
