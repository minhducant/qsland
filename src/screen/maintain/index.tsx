import React from 'react'
import { Block } from '@mylib'
import { Image, StatusBar, Text } from 'react-native'
import { LayoutAuth } from '@components'
import { AppImage } from '@assets'
import { createStackNavigator } from '@react-navigation/stack'
// import { logoutApp } from 'src/lib/aysync'
import { AppLang } from '@assets/langs'
const { Screen, Navigator } = createStackNavigator()
export default function Maintain() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={'Maintain'} component={Container} />
    </Navigator>
  )
}

function Container() {

  return (
    <LayoutAuth>
      <Block flex1 padH20>
        <Block flex1 alignCenter>
          <Image
            source={AppImage('logo_bdc')}
            style={{
              width: 130,
              height: 130,
              resizeMode: 'contain',
              marginTop: 50,
            }}
          />
        </Block>
        <Block flex8 mid>
          <Text
            style={{
              textAlign: 'center',
              color: '#D86A04',
            }}>
            {`resInfo.maintain_mess`}
          </Text>
          <Text
            // onPress={() => logoutApp()}
            style={{
              textAlign: 'center',
              marginTop: 30,
              color: 'gray',
            }}>
            {'<<  '}
            {AppLang('dang_nhap')}
          </Text>
        </Block>
      </Block>
    </LayoutAuth>
  )
}
