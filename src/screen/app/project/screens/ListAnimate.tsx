import React from "react";
import { Animated } from "react-native";
export class AnimatedList {
    headerHeight = 50;
    scrollValue = 0;
    headerVisible = true;
    focused = false;
    animation: any = null
    constructor(
        headerHeight = 50,
        scrollValue = 0,
        headerVisible = true,
        focused = false) {
        this.headerHeight = headerHeight
        this.scrollValue = scrollValue
        this.headerVisible = headerVisible
        this.focused = focused
        this.animation = new Animated.Value(0)
    }
    onScroll = (e: any,) => {
        const y = e.nativeEvent.contentOffset.y
        if (y > this.scrollValue && this.headerVisible && y > this.headerHeight / 2) {
            Animated.spring(this.animation, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 0,
            }).start();
            this.headerVisible = false;
        }
        if (y < this.scrollValue && !this.headerVisible) {
            Animated.spring(this.animation, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 0,
            }).start();
            this.headerVisible = true;
        }
        this.scrollValue = y;
    }
    AnimateHeader = ({ children }: any) =>
        <Animated.View
            style={{
                zIndex: 99,
                backgroundColor: '#fff',
                height: this.headerHeight,
                width: '100%',
                opacity: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                }),
                position: 'absolute',
                transform: [{
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -this.headerHeight],
                    })
                },]
            }}>
            {children}
        </Animated.View>
}


