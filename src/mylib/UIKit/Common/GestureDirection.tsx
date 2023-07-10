'use strict';

import React from 'react';
import { PanResponderGestureState } from 'react-native';
import RNGestureRecognizer, { GestureRecognizerProps } from 'react-native-swipe-gestures';
enum swipeDirections {
    SWIPE_UP = 'SWIPE_UP',
    SWIPE_DOWN = 'SWIPE_DOWN',
    SWIPE_LEFT = 'SWIPE_LEFT',
    SWIPE_RIGHT = 'SWIPE_RIGHT',
}
interface Props extends GestureRecognizerProps {
    children?: React.ReactNode
}
class GestureDirection extends React.PureComponent<Props>  {
    state: {
        myText?: string
        gestureName?: string
        backgroundColor?: string
    }
    constructor(props: Props) {
        super(props);
        this.state = {
            gestureName: 'none',
        };
    }
    onSwipeUp(gestureState: PanResponderGestureState) {
        console.log('onSwipeUp')

    }
    onSwipeDown(gestureState: PanResponderGestureState) {
        console.log('onSwipeDown')
    }

    onSwipeLeft(gestureState: PanResponderGestureState) {
        console.log('onSwipeLeft')
    }
    onSwipeRight(gestureState: PanResponderGestureState) {
        console.log('onSwipeRight')
    }

    onSwipe(gestureName: string, gestureState: PanResponderGestureState) {
        console.log('onSwipe-common', gestureName)
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

        switch (gestureName) {
            case SWIPE_UP:
                break;
            case SWIPE_DOWN:
                break;
            case SWIPE_LEFT:
                break;
            case SWIPE_RIGHT:
                break;
        }
    }

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            <RNGestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={[{}, this.props.style]}
            >
                {this.props.children}
            </RNGestureRecognizer>
        );
    }
}

export default GestureDirection;

