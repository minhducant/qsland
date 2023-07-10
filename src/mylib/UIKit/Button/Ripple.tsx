import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, useCallback } from 'react'
import Ripple, { RippleProps } from 'react-native-material-ripple';
interface ButtonRippleProps extends RippleProps {
    children: ReactNode
    rippleOpacity?: any,
    rippleColor?: string,
    rippleDuration?: number,
    rippleSize?: number,
    rippleCentered?: any,
    rippleSequential?: any,
    rippleFade?: any
    onRippleAnimation?: (e: any) => any
    scaleValue?: number
    scale?: boolean
    options?: {
        color?: string
        duration?: number
        opacity?: number
    }

}
export default function ButtonRipple({ children, scaleValue = 1.1, scale = false, style, options = {}, ...props }: ButtonRippleProps) {
    const animatedButtonScale = React.useRef(new Animated.Value(1)).current;
    const onPressIn = useCallback(() => {
        Animated.spring(animatedButtonScale, {
            toValue: scaleValue,
            useNativeDriver: true,
        }).start();
    }, [scaleValue]);
    const onPressOut = useCallback(() => {
        Animated.spring(animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);
    return (
        <Ripple onPressIn={onPressIn} onPressOut={onPressOut}
            {...props}
            {... (options.color && { rippleColor: options.color })}
            {... (options.duration && { rippleDuration: options.duration })}
            {... (options.opacity && { rippleOpacity: options.opacity })}
        >
            <Animated.View style={[{ transform: [{ scale: scale ? animatedButtonScale : 1 }] }, style]}>
                {children}
            </Animated.View>
        </Ripple>
    )
}
const styles = StyleSheet.create({})