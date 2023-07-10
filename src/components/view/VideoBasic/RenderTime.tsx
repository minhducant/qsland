import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Moment from 'moment'

export default function RenderTime({ point, type, length }: any) {
  if (type === 'left')
    return (
      <Text style={{ color: '#fff' }}>
        {Moment()
          .startOf('day')
          .seconds(parseFloat(point).toFixed(0))
          .format('mm:ss')}
      </Text>
    )
  if (type === 'right')
    return (
      <Text style={{ color: '#fff' }}>
        {'-'}
        {length === -1
          ? '00:00'
          : Moment()
            .startOf('day')
            .seconds(parseFloat(length - point).toFixed(0))
            .format('mm:ss')}
      </Text>
    )
}
const styles = StyleSheet.create({})
