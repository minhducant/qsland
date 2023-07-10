import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-elements';

import { Time } from './Time'
import { IconC } from '@mylib'
export type MenuVideoRef = {
  setPoint?(value: number): void;
  setLength?: (value: number) => void;
}
export type MenuVideoProps = {
  onSlidingStart?(value: number): void;
  onSlidingComplete?(value: number): void;
  onChangePlay?(): void;
  width: number
  height: number
  paused: boolean
  hidden?: boolean
  styleContainer?: ViewProps['style']
}


export const Menu = forwardRef<MenuVideoRef, MenuVideoProps>(({
  onSlidingStart,
  onSlidingComplete,
  onChangePlay,
  styleContainer,
  width,
  height,
  paused,
  hidden,
  ...props
}, ref) => {
  useImperativeHandle(ref, () => ({
    setPoint(x: number) {
      setPoint(x)
    },
    setLength(x: number) {
      setLength(x)
    },
  }))
  const [point, setPoint] = useState(0)
  const [length, setLength] = useState(-1)
  const getSizePlay = (height: number) => {
    if (height * 0.2 > 23) return 30
    return height * 0.15
  }
  if (hidden) return <></>
  return (
    <View style={[styles.container, styleContainer]}>
      <TouchableOpacity activeOpacity={0.6} onPress={onChangePlay}>
        <IconC
          name={paused ? 'play' : 'pause'}
          size={getSizePlay(height)}
          color='#fff'
        />
      </TouchableOpacity>
      <Time point={point} type='left' length={length} />
      <Slider
        style={{ flex: 1, marginHorizontal: 5 }}
        value={point}
        minimumValue={0}
        maximumValue={length === -1 ? 1 : length}
        allowTouchTrack={false}
        disabled={true}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        trackStyle={[styles.trackStyle,]}
        maximumTrackTintColor={maximumTrackTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        thumbStyle={[styles.thumbStyle,]}
        thumbTouchSize={{ width: 40, height: 40 }}
      />
      <Time point={point} type='right' length={length} />
    </View>
  )
})

const maximumTrackTintColor = "white"
const minimumTrackTintColor = "red"

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  trackStyle: { height: 3, backgroundColor: 'pink' },
  thumbStyle: { height: 15, width: 15, backgroundColor: 'red' }
})
