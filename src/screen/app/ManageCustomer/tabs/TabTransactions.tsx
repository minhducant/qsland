import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppLang } from '@assets/langs';
import { TextApp } from '@components';
import { AppColor } from '@assets/colors';
/**Giao dich */
export default function TabTransactions() {
  return (
    <View style={styles.container}>
      <TextApp center color={AppColor('primary')}>{AppLang('thong_bao_khong_giao_dich')}</TextApp>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
})
