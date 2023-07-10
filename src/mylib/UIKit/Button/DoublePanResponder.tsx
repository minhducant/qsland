import React, { Component } from 'react'
import { View, PanResponder, Alert, Animated } from 'react-native'
import PropTypes from 'prop-types'

export default class DoubleClicker extends Component {
  myPanResponder: any
  prevTouchInfo: any
  constructor() {
    super()
    this.myPanResponder = {}

    this.prevTouchInfo = {
      prevTouchX: 0,
      prevTouchY: 0,
      prevTouchTimeStamp: 0,
    }

    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this)
  }

  componentWillMount() {
    this.myPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this.handlePanResponderGrant,
    })
  }
  distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))
  }

  isDoubleTap(currentTouchTimeStamp, { x0, y0 }) {
    const { prevTouchX, prevTouchY, prevTouchTimeStamp } = this.prevTouchInfo
    const dt = currentTouchTimeStamp - prevTouchTimeStamp
    const { delay, radius } = this.props

    return dt < delay && this.distance(prevTouchX, prevTouchY, x0, y0) < radius
  }

  handlePanResponderGrant(evt, gestureState) {
    console.log('handlePanResponderGrant')
    const currentTouchTimeStamp = Date.now()

    if (this.isDoubleTap(currentTouchTimeStamp, gestureState)) {
      this.props.onClick(evt, gestureState)
      this.onBegan()
    }

    this.prevTouchInfo = {
      prevTouchX: gestureState.x0,
      prevTouchY: gestureState.y0,
      prevTouchTimeStamp: currentTouchTimeStamp,
    }
  }
  opacity = new Animated.Value(1)
  onBegan() {
    // console.log('onBegan11111')
    Animated.timing(this.opacity, {
      toValue: 0.5,
      duration: 50,
      useNativeDriver: true
    }).start(
      () => Animated.timing(this.opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }).start()
    )
  }
  onFailed() {
    // console.log('onFailed222222')
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start()
  }


  render() {
    return (
      <Animated.View style={{ opacity: this.opacity }} {...this.props} {...this.myPanResponder.panHandlers} >
        {this.props.children}
      </Animated.View>
    )
  }
}

DoubleClicker.defaultProps = {
  delay: 300,
  radius: 20,
  onClick: () => Alert.alert('Double Tap Succeed'),
}

DoubleClicker.propTypes = {
  delay: PropTypes.number,
  radius: PropTypes.number,
  onClick: PropTypes.func,
}
