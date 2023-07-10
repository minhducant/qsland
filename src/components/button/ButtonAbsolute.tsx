import React, { useRef } from 'react'
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
interface P {
  onPress?: () => void
}
export default function ButtonAbsolute({ onPress }: P) {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value })
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset()
      },
    }),
  ).current
  // const callImage=useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  return (
    <Animated.View
      style={[styles.box, { transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={require('./call3.gif')}
          style={{
            width: 120,
            height: 120,
            resizeMode: 'contain',
            // tintColor: 'red',
          }}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8a0055',
  },
  box: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    height: 10,
    width: 10,
    backgroundColor: '#8a0055',
    position: 'absolute',
  },
  box2: {
    height: 10,
    width: 10,
    backgroundColor: '#8a0055',
    position: 'absolute',
  },
  line1: {
    height: 1,
    width: '100%',
    backgroundColor: '#8a0055',
    position: 'absolute',
  },
  line2: {
    height: '100%',
    width: 1,
    backgroundColor: '#8a0055',
    position: 'absolute',
  },
  txt: {
    color: '#fff',
  },
  reset: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
})
