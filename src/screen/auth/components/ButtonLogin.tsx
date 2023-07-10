import { StyleSheet, Text, TouchableOpacity, TextProps, ViewProps, ActivityIndicator } from 'react-native'
import React from 'react'
import { AppColor } from '@assets/colors';
import LinearGradient from 'react-native-linear-gradient'
const COLOR_START = AppColor('primary')
const COLOR_END = '#9597F0'

interface ButtonLogin {
  onPress: () => void
  disabled?: boolean
  refreshing?: boolean
  style?: ViewProps['style']
  textStyle?: TextProps['style']
  title: string
  backgroundColorInactive?: string
}
export default function ButtonLogin({ onPress, title, disabled, refreshing, backgroundColorInactive = 'gray', ...props }: ButtonLogin) {
  return (

    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.box, { ...(disabled && { backgroundColor: backgroundColorInactive }) }]}>
      <LinearGradient
        colors={[COLOR_START, COLOR_END]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container, { ...(disabled && { backgroundColor: backgroundColorInactive }) }]}>
        {!refreshing && <Text style={styles.text}>{title}</Text>}
        {refreshing && <ActivityIndicator color={'#fff'} />}
      </LinearGradient>
    </TouchableOpacity >
  )
}
ButtonLogin.defaultProp = {
  backgroundColorInactive: 'gray'
}
const styles = StyleSheet.create({
  container: {
    minHeight: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  box: {
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.1,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },


})