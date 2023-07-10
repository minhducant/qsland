import { screen_height } from '@components/index';
import { arrayData } from '@utils/format'
import { Log } from '@utils/LogColor'
import moment from 'moment';
import { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native';
import { isArray, isEmpty } from 'underscore';
import { isString } from 'underscore';
let listeners: any[] = []
const cell_w = screen_height * 0.1 * 0.8
const cell_h = screen_height * 0.1 * 0.9

let init = {
  width: cell_w,
  height: cell_h,
  scale: new Animated.Value(1),
  scale_prev: 1
}
let state = {
  width: cell_w,
  height: cell_h,
  scale: new Animated.Value(1),
  scale_prev: 1,

}
const useCustom = () => {
  const newListener = useState<any>()[1]
  useEffect(() => {
    listeners.push(newListener)
    return () => {
      listeners = listeners.filter(listener => listener !== newListener)
    }
  }, [])
  const setState: any = (newState: any) => {
    state = { ...state, ...newState }
    listeners.forEach(listener => {
      listener(state)
    })
  }
  return [state, setState]
}
let scale = 1
export const useResize = () => {
  const [state1, setState1] = useCustom()
  const state = state1 ?? init
  function add() {
    scale = scale + 0.1
    Animated.timing(state.scale, {
      toValue: scale,
      // duration: 2000,
      useNativeDriver: false
    }).start()
    setState1({ ...state, width: scale * cell_w, height: scale * cell_h })
  }
  function sub() {
    scale = scale - 0.1
    Animated.timing(state.scale, {
      toValue: scale,
      // duration: 2000,
      useNativeDriver: false
    }).start()
    setState1({ ...state, width: scale * cell_w, height: scale * cell_h })
  }
  return {
    add,
    sub,
    width: state.width,
    height: state.height,
    scale: state.scale,
    fontSize: state.scale.interpolate({
      inputRange: [0.1, 1, 10],
      outputRange: [3, 14, 30],
    }),
    width_animate: state.scale.interpolate({
      inputRange: [1, 10],
      outputRange: [cell_w, cell_w * 10],
    }),
    height_animate: state.scale.interpolate({
      inputRange: [1, 10],
      outputRange: [cell_h, cell_h * 10],
    }),
  }
}
