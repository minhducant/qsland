import React from 'react';
import {

    StyleSheet,

} from 'react-native';
import RNSwipeable from 'react-native-gesture-handler/Swipeable';
type RNSwipeableProps = React.ComponentPropsWithoutRef<typeof RNSwipeable>
interface Props extends RNSwipeableProps {
    children?: React.ReactNode
    LeftComponent?: RNSwipeableProps['renderLeftActions']
    RightComponent?: RNSwipeableProps['renderRightActions']
    containerStyle?: RNSwipeableProps['containerStyle']
    onLeftOpen?: RNSwipeableProps['onSwipeableLeftOpen']
    onRightOpen?: RNSwipeableProps['onSwipeableRightOpen']
}
export default function Swipeable({ LeftComponent, RightComponent, ...props }: Props) {
    return (
        <RNSwipeable
            containerStyle={{ backgroundColor: 'blue' }}
            renderLeftActions={LeftComponent}
            renderRightActions={RightComponent}
            onSwipeableLeftOpen={props.onLeftOpen}
            onSwipeableRightOpen={props.onRightOpen}
            {...props}
        >
            {props.children}
        </RNSwipeable>
    )
}

const styles = StyleSheet.create({})