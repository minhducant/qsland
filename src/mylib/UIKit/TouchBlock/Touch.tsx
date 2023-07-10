import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Style } from './Style'
import { Props } from './Props'
import { isArray } from 'underscore'
import LinearGradient from 'react-native-linear-gradient'
import isColor from "validate-color";

type TouchableOpacityRef = React.ComponentRef<typeof TouchableOpacity>
const Touch = React.forwardRef<TouchableOpacityRef, Props>(({ style, ...props }, ref) => {
  if (props?.hidden) return <></>
  if (isArray(props.background) && props.background.length > 1 && props.background.every(i => isColor(i)))
    return (
      <TouchableOpacity
        ref={ref}
        {...props}
        activeOpacity={props.activeOpacity || 0.5}
      // style={[TouchStyle(props), props.style, props.styleBox]}
      >
        <LinearGradient
          colors={props.background}
          start={props.gradient == "vertical" ? { x: 0, y: 0 } : { x: 0, y: 0 }}
          end={props.gradient == "vertical" ? { x: 0, y: 1 } : { x: 1, y: 0 }}
          style={[Style(props), style, props.styleBox]}
        >
          {props.children}
        </LinearGradient >
      </TouchableOpacity>
    )
  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={props.activeOpacity || 0.5}
      style={[Style(props), style, props.styleBox]}
      {...props}>
      {props.children}
    </TouchableOpacity>
  )
})

export default Touch
const styles = StyleSheet.create({
  defaultTouch: {

  },
})
// Touch.defaultProps = {
//   activeOpacity: 0.8,
//   // shadowOption: { color: '#000', elevation: 1, width: 1, height: 1, opacity: 0, radius: 10 }

// }
