import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import InputText from './Chat.TextInput'
import FlatListChat from './FlatListChat'
export interface ChatAndroidProps { }
export default function ChatScreenAndroid(props: ChatAndroidProps) {
  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'pink' }}>
        <Text>ChatScreenAndroid</Text>
        <FlatListChat />
      </ScrollView>
      <InputText />
    </View>
  )
}
