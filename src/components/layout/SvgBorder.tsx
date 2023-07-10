import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Svg, {Path} from 'react-native-svg'

export default function SvgBorder ({
  x,
  y,
  r,
  o,
  backgroundColor,
  ...rest
}: any) {
  return (
    <Svg
      style={{
        width: x,
        height: y,
        ...rest,
        opacity: o,
      }}>
      <Path
        d={
          'M' +
          x +
          ',' +
          y +
          ' L' +
          x +
          ' 0  L0,0 L0,' +
          y +
          'a ' +
          r +
          ',' +
          r +
          ' 1 0 1 ' +
          r +
          ',-' +
          r +
          ' L' +
          (x - r) +
          ',' +
          (y - r) +
          ' a ' +
          r +
          ',' +
          r +
          ' 1 0 1 ' +
          r +
          ',' +
          r +
          ''
        }
        fill={backgroundColor}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({})
