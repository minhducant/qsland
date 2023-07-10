import { StyleSheet, Text, View, ViewProps } from 'react-native'
import React, { useState } from 'react'
import { Slider } from 'react-native-elements';
export type SliderAnimateRef = {
  setValue?: (e: number) => any
  clear?: () => any
}
export type SliderAnimateProps = {
  styleTrack?: ViewProps['style']
  styleThumb?: ViewProps['style']
  onSlidingStart?(value: number): void;
  onSlidingComplete?(value: number): void;
}
export const SliderAnimate = React.forwardRef<SliderAnimateRef, SliderAnimateProps>((
  {
    styleTrack,
    styleThumb,
    onSlidingStart,
    onSlidingComplete
  }, ref) => {
  React.useImperativeHandle(ref, () => ({
    setValue: (value: number) => setValue(value),
    clear() {
      setValue(0)
    },
  }))
  const [value, setValue] = useState<number>(5)
  return (
    <Slider
      value={value}
      maximumValue={10}
      minimumValue={1}
      allowTouchTrack={false}
      // disabled={true}
      onValueChange={setValue}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
      trackStyle={[styles.trackStyle, styleTrack]}
      maximumTrackTintColor={maximumTrackTintColor}
      minimumTrackTintColor={minimumTrackTintColor}
      thumbStyle={[styles.thumbStyle, styleThumb]}
    />
  )
})
const maximumTrackTintColor = "white"
const minimumTrackTintColor = "blue"
const styles = StyleSheet.create({
  trackStyle: { height: 3, backgroundColor: 'pink' },
  thumbStyle: { height: 15, width: 15, backgroundColor: 'red' }
})