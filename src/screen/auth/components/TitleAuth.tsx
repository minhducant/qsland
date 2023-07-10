import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconC } from '@mylib/UIKit'
import { goBack } from '@navigation'
import { AppColor } from '@assets/colors'

export default function TitleAuth({ title, back = false, onTitle }: any) {
  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity onPress={goBack} style={styles.box}>
          <IconC
            name={'chevron-back-outline'}
            size={26}
            color={AppColor('primary')}
          />
        </TouchableOpacity>
      )}
      <Text
        onPress={onTitle}
        style={{
          fontSize: 20,
          textTransform: 'uppercase',
          fontWeight: '700',
          textAlign: 'center',
          color: AppColor('txt_black'),
        }}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {},
  box: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    // backgroundColor: 'red',
  },
})
