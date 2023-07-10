import { InputAccessoryView, Platform, ScrollView, Text, View } from 'react-native'
import React from 'react'
import InputText from './InputText'

export interface ChatAndroidProps { }
export function ChatAndroid(props: ChatAndroidProps) {
  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'pink' }}>
        <Text>ChatScreenAndroid</Text>
      </ScrollView>
      <InputText />
    </View>
  )
}
export interface ChatIosProps { }
export function ChatIos(props: ChatIosProps) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }}>
        <Text>ChatIosProps</Text>
      </ScrollView>
      <InputAccessoryView backgroundColor='#fffffff7'>
        <InputText />
      </InputAccessoryView>
    </View>
  )
}
export interface ChatProps { }
export default function ChatInput(props: ChatProps) {
  if (Platform.OS == 'android') return <ChatAndroid {...props} />
  if (Platform.OS == 'ios') return <ChatIos {...props} />
  return <></>
}