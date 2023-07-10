
import React, { ReactNode, useCallback } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';

interface ButtonScaleProps extends TouchableWithoutFeedbackProps {
    children: ReactNode
    scaleValue?: number
}
export default function ButtonScale({ children, style, scaleValue = 1.5, ...props }: ButtonScaleProps) {
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
        <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            {...props}
        >
            <Animated.View style={[{ transform: [{ scale: animatedButtonScale }] }, style]}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};
