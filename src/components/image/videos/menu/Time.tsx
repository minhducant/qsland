import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Moment from 'moment'
type RenderTimeProps = { point: any, type: 'left' | 'right', length: any }
export function Time({ point, type, length }: RenderTimeProps) {
  if (type === 'left')
    return (
      <Text style={{ color: '#fff' }}>
        {Moment()
          .startOf('day')
          .seconds(Number(parseFloat((point).toString()).toFixed(0)))
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
            .seconds(Number(parseFloat((length - point).toString()).toFixed(0)))
            .format('mm:ss')}
      </Text>
    )
  return <></>
}
const styles = StyleSheet.create({})
