import {
    RNVectorIcon, NameIcon
} from "./index"
import React from 'react'
import {
    FlexStyle,
    StyleProp,
    StyleSheet,
    TextProps,
    TextStyle,
    TouchableOpacity,
    ViewProps,
    ViewStyle,
} from 'react-native'
import { AppColor, ColorName } from "@assets/colors";
import { isArray, isEmpty, isNumber, isObject, isString } from "underscore";

export interface Props {
    name: string | Array<keyof typeof NameIcon>
    size?: number | Array<size>
    color?: string | Array<ColorName>
    type?: keyof typeof RNVectorIcon
    onPress?: () => void
    styleContainer?: StyleProp<ViewStyle>
    style?: StyleProp<TextStyle>
    alignSelf?: FlexStyle['alignSelf']
    disabled?: boolean
    activeOpacity?: number
    //


}
export const Style: any = (props: Props, ColorApp = AppColor) => {
    const PropsConvert = StyleSheet.flatten([


    ])

    return [
        PropsConvert,
    ]
}
export const switchArrayValue = (value: any) => {
    if (isArray(value) && value.length == 1) return value[0]
    if (isString(value) || isNumber(value)) return value
    return undefined
}
export const switchArrayValueFromData = (value: any, ColorApp = AppColor) => {
    if (isArray(value) && value.length == 1) return ColorApp(value[0])
    if (isString(value) || isNumber(value)) return value
    return undefined
}
type size = 18 | 20 | 22 | 23 | 24 | 25 | 26 | 28 | 30 | 32 | 34 | 36

