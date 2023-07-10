import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchStyle } from './TouchStyle'
import { PropsTouch } from './TouchProps'
import { isArray } from 'underscore';
import LinearGradient from 'react-native-linear-gradient'

type TouchableOpacityRef = React.ComponentRef<typeof View>
const TouchUI = React.forwardRef<TouchableOpacityRef, PropsTouch>((props, ref) => {
  if (props?.hidden) return <></>
  if (isArray(props.background) && props.background.length > 1)
    return (
      <LinearGradient
        colors={props.background}
        start={props.gradient == "vertical" ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        end={props.gradient == "vertical" ? { x: 0, y: 1 } : { x: 1, y: 0 }}
        style={[TouchStyle(props), props.style, props.styleBox]}>
        {props.children}
      </LinearGradient >
    )
  return (
    <View
      ref={ref}
      {...props}
      style={[TouchStyle(props), props.style, props.styleBox]}>
      {props.children}
    </View>
  )
})

export default TouchUI
const styles = StyleSheet.create({
  defaultTouch: {
  },
})
