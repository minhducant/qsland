import React from 'react'
import { InputAccessoryView, ScrollView, Text, View } from 'react-native'
import InputText from './Chat.TextInput'
import FlatListChat from './FlatListChat'
export interface ChatIosProps { }
export default function ChatIos(props: ChatIosProps) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }}>
        <Text>ChatIosProps</Text>
        <FlatListChat />
      </ScrollView>
      <InputAccessoryView backgroundColor='#fffffff7'>
        <InputText />
      </InputAccessoryView>
    </View>
  )
}
