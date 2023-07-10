import { StyleSheet, Text, View, TextProps, ViewProps } from 'react-native'
import React from 'react'
import { Block, IconC } from '@mylib/UIKit'
import { AppColor } from '@assets/colors'
import { TextApp, stylesApp } from '@components'
type props = {
    title: string
    children?: React.ReactNode
    containerStyle?: ViewProps['style']
    titleStyle?: TextProps['style']
    onPressRight?: () => void
    show?: boolean,
    border?: number
}
export default function Card({ title = 'title', children, onPressRight, show = true, border, ...props }: props) {
    const isRight = typeof onPressRight == "function"
    if (!show) return null
    return (
        <View style={[styles.container, border && { borderRadius: border }, props.containerStyle]}>
            <View style={styles.header}>
                <TextApp white bold style={props.titleStyle}>
                    {title}
                </TextApp>
                {isRight && <IconC name="add" onPress={onPressRight} alignSelf="auto" color={'#fff'} />}
            </View>
            <Block pad10>
                {children}
            </Block>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 100,
        backgroundColor: '#fff',
        borderLeftColor: AppColor('primary'),
        borderLeftWidth: 2,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        overflow: 'hidden',

        marginBottom: 10,
        ...stylesApp.shawDow,
    },
    header: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: AppColor('primary'),
        //
        flexDirection: 'row',
    },
})
