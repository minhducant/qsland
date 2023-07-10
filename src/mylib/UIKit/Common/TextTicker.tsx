import RNTextTicker, { TextTickerProps } from 'react-native-text-ticker'
import { StyleSheet, TextProps } from 'react-native'
import React from 'react'
interface Props extends TextTickerProps {
    children?: React.ReactNode
    style?: TextProps['style']
}
export default function TextTicker({ children, style, ...props }: Props): React.JSX.Element {
    return (
        <RNTextTicker
            style={[style]}
            duration={3000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}
            scrollSpeed={50}
            bounceSpeed={20}
            {...props}
        >
            {children}
        </RNTextTicker>
    )
}

const styles = StyleSheet.create({})
