import React, { useRef, } from 'react';
import { Animated, ViewProps } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
interface Props {
  onPress?: () => void
  children?: React.ReactNode
  style?: ViewProps['style']
}
export default function DoubleGuest({ onPress, children, style, ...props }: Props) {

  const doubleTapRef = useRef(null);
  const opacity = useRef(new Animated.Value(1)).current
  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      if (typeof onPress == "function") onPress()
    }
  };
  function onBegan() {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 50,
      useNativeDriver: true
    }).start()
  }
  function onFailed() {
    // console.log('onFailed222222')
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start()
  }
  return (
    <TapGestureHandler
      onBegan={onBegan}
      onEnded={onFailed}
      onActivated={onFailed}
      onFailed={onFailed}
      onCancelled={onFailed}
      ref={doubleTapRef}
      onHandlerStateChange={onDoubleTapEvent}
      numberOfTaps={2}
    >
      <Animated.View style={[{ opacity }, style]} >
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
}