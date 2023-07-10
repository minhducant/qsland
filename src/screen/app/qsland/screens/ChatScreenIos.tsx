import React from 'react'
import { InputAccessoryView, Keyboard, ScrollView, Text, View } from 'react-native'
import { InputText } from './RNChatUI'
import FlatListChat from './RNChatUI/FlatListChat'
const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 100 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text onPress={() => Keyboard.dismiss()}>Keyboard.dismiss</Text>
        <FlatListChat />
      </ScrollView>
      <InputAccessoryView backgroundColor='#fffffff7'>
        <InputText />
      </InputAccessoryView>
    </View>
  )
}

export default App
