import { AppColor } from "@assets/colors";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { isArray, isEmpty, isNumber, isObject, isString } from "underscore";
import { Props } from './Props'
export const Style: any = (props: Props, ColorApp = AppColor) => {
    const PropsConvert = StyleSheet.flatten([
        props.color && { color: switchArrayValueFromData(props.color, ColorApp) },
        props.background && { backgroundColor: switchArrayValueFromData(props.background, ColorApp) },
        props.size && { fontSize: switchArrayValue(props.size) },
        props.center && { textAlign: 'center' },
        props.italic && { fontStyle: 'italic' },
        props.bold && { fontWeight: '500' },
        props.underline && { textDecorationLine: 'underline' },
        props.toUpperCase && { textTransform: 'uppercase' },
        props.toLowerCase && { textTransform: 'lowercase' },
        props.flex1 && { flex: 1 },
        props.white && { color: "white" }, props.red && { color: "red" },
        props.blue && { color: "blue" }, props.green && { color: "green" },
        props.yellow && { color: "yellow" }, props.pink && { color: "pink" },
        props.gray && { color: "gray" }, props.primary && { color: "#4481EB" },
        props.black && { color: "black" },
        //old
        props.backgroundColor && { backgroundColor: props.backgroundColor },//old
        props.size12 && { fontSize: 12 },//old
        props.size14 && { fontSize: 14 },//old
        props.size16 && { fontSize: 16 },//old
        props.size18 && { fontSize: 18 },//old
        props.size20 && { fontSize: 20 },//old
        props.size22 && { fontSize: 22 },//old
        props.UPPER && { textTransform: 'uppercase' },//old
        props.lower && { textTransform: 'lowercase' },//old
        props.colorW && { color: '#fff' },//old
        props.colorR && { color: 'red' },//old
        props.colorP && { color: ColorApp('primary') },//old
        //
        props.flex1 && { flex: 1 }, props.flex2 && { flex: 2 }, props.flex3 && { flex: 3 },
        props.flex4 && { flex: 4 }, props.flex5 && { flex: 5 }, props.flex6 && { flex: 6 },
        props.flex7 && { flex: 7 }, props.flex8 && { flex: 8 }, props.flex9 && { flex: 9 },
        //

    ])
    const PropsApp = StyleSheet.flatten([

    ])
    return [
        PropsApp,
        PropsConvert,
    ]
}
const switchArrayValue = (value: any) => {
    if (isArray(value) && value.length == 1) return value[0]
    if (isString(value) || isNumber(value)) return value
    return undefined
}
const switchArrayValueFromData = (value: any, ColorApp = AppColor) => {
    if (isArray(value) && value.length == 1) return ColorApp(value[0])
    if (isString(value) || isNumber(value)) return value
    return undefined
}

