import {Platform} from 'react-native'
import React from 'react'
import ChatAndroid from './Chat.Android'
import ChatIos from './Chat.Ios'
export interface ChatProps {}
export default function Chat (props: ChatProps) {
  if (Platform.OS == 'android') return <ChatAndroid {...props} />
  if (Platform.OS == 'ios') return <ChatIos {...props} />
  return <></>
}
