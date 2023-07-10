import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Style } from './Style'
import { Props } from './Props'
import { isArray } from 'underscore';
import LinearGradient from 'react-native-linear-gradient'
import isColor from "validate-color";

type TouchableOpacityRef = React.ComponentRef<typeof View>
const Block = React.forwardRef<TouchableOpacityRef, Props>(({ style, ...props }, ref) => {
  if (props?.hidden) return <></>
  if (isArray(props.background) && props.background.length > 1 && props.background.every(i => isColor(i)))
    return (
      <LinearGradient
        colors={props.background}
        start={props.gradient == "vertical" ? { x: 0, y: 0 } : { x: 0, y: 0 }}
        end={props.gradient == "vertical" ? { x: 0, y: 1 } : { x: 1, y: 0 }}
        style={[Style(props), style, props.styleBox]}>
        {props.children}
      </LinearGradient >
    )
  return (
    <View
      ref={ref}
      style={[Style(props), style, props.styleBox]}
      {...props}>
      {props.children}
    </View>
  )
})

export default Block
const styles = StyleSheet.create({
  defaultTouch: {
  },
})
