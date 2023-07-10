import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native'

import Slider from '@react-native-community/slider'
import RenderTime from './RenderTime'
import { IconC } from '@mylib'
const OptionVideo = forwardRef((props: any, ref) => {
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
    if (height * 0.05 > 23) return 20
    return height * 0.05
  }
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: props.width,
        height: props.height * 0.12,
        flexDirection: 'row',
        backgroundColor: props.background,
        paddingHorizontal: 5,
      }}>
      <TouchableOpacity activeOpacity={0.6} onPress={props.onPressButton}>
        <IconC
          name={props.paused ? 'play' : 'pause'}
          size={getSizePlay(props.height)}
          color='#fff'
        />
      </TouchableOpacity>
      <RenderTime point={point} type='left' />
      <Slider
        style={{
          width: props.width * 0.6,
          height: props.height * 0.12,
        }}
        value={point}
        minimumValue={0}
        maximumValue={length === -1 ? 1 : length}
        minimumTrackTintColor='#F70000'
        maximumTrackTintColor='#FFFFFF'
        thumbTintColor='#FF0000'
        onSlidingComplete={props.onSlidingComplete}
        onSlidingStart={props.onSlidingStart}
      />
      <RenderTime point={point} type='right' length={length} />
    </View>
  )
})
export default OptionVideo
const { width } = Dimensions.get('window')
OptionVideo.defaultProps = {
  background: '#000',
  widthSlider: width,
  height: 40,
  width: 280,
}
const styles = StyleSheet.create({
  optionVideo: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
