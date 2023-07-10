import { StyleSheet, Text, View, ViewProps, TextProps, TouchableOpacity } from 'react-native'
import React, { useRef, useState, forwardRef } from 'react'
import { useEffect, useMemo } from 'react';
import moment from 'moment';
export type LiveRef = {
  play?(): void;
  pause?(): void;
  clear?(): void;
}
export type LiveProps = {
  timeStart: string
  hidden?: boolean
  containerStyle?: ViewProps['style']
  textStyle?: TextProps['style']
  onPress?(): void;
  width: number
  height: number
}
export const Live = (forwardRef<LiveRef, LiveProps>(({ width, height, timeStart, hidden, containerStyle, textStyle, onPress }, ref) => {
  React.useImperativeHandle(ref, () => ({ play, pause, clear }))
  const [time, setTime] = useState<any>(new Date(timeStart))
  const cacheInterval = useRef<any>()
  const play = () => {
    // console.log('play-live')
    cacheInterval.current = setInterval(() => {
      setTime((date: any) => new Date(date.getTime() + 1000))
    }, 1000)
  }
  const pause = () => {
    // console.log('pause-live')
    if (cacheInterval.current) clearInterval(cacheInterval.current)
  }
  const clear = () => {
    if (cacheInterval.current) clearInterval(cacheInterval.current)
    setTime(new Date(timeStart))
  }
  useEffect(() => { return () => { pause() } }, [])
  if (hidden) return <></>
  const fontSize = width * 0.03 || 10 // useMemo(() => { }, [])
  const activeOpacity = typeof onPress == "function" ? 0.5 : 1
  // console.log('time', time)
  // console.log('textStyle', textStyle)
  // console.log('fontSize', fontSize)
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.text, { fontSize: fontSize }, textStyle]}>{moment(time).format('YYYY/MM/DD')}</Text>
      <Text style={[styles.text, { fontSize: fontSize }, textStyle]}>{moment(time).format('HH:mm:ss')}</Text>
    </TouchableOpacity>
  )
})
)
const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'black',
    overflow: 'hidden'
  },
  text: {
    color: 'white',
    fontSize: 10,
  }
})