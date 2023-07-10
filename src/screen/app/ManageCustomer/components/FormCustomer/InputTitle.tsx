import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styleInput } from './styleInput'
import { IconApp } from '@lib/components'
import { TouchableOpacity } from 'react-native';
import { TextApp } from '@components/text';

export default function InputTitle({ title, required }: any) {
  return (
    <View style={styleInput.titleContainer}>
      <TextApp style={styleInput.title}>
        {title}
        {required && <Text style={{ color: 'red' }}>{' *'}</Text>}
      </TextApp>
    </View>
  )
}

export function Title({ title, line = true, containerStyle, uppercase, contentStyle, icon, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={[
      styleInput.titleContainer,
      { ...line && { borderBottomWidth: 1, borderColor: '#ddd', } },
      { marginTop: 15, padding: 10, paddingBottom: 5 },
      containerStyle
    ]}>
      <TextApp style={[styleInput.title, { ...uppercase && { textTransform: 'uppercase' } }, contentStyle]}>
        {title}
      </TextApp>
      {icon && <IconApp name={icon?.name} />}
    </TouchableOpacity>
  )
}