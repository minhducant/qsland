import React from 'react'

import { ScrollView, View } from 'react-native'
import { InputText } from './RNChatUI'
export default function ChatScreenAndroid() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView></ScrollView>
      <InputText />
    </View>
  )
}
