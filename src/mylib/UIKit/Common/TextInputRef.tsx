import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    Ref,
    LegacyRef,
} from 'react'
import {
    TextStyle,
    ViewStyle,
    ViewProps,
    TextProps,
    ColorValue,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    StyleProp,
} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { useRef } from 'react'
import { IconC } from '@mylib/UIKit'
export type Handle = {
    getValue: () => void
    check?: () => void
    focus?: () => void
    clear?: () => void
}

interface Props extends TextInputProps {
    placeholder?: string
    valueInit?: string
    look?: boolean
    containerStyle?: ViewProps['style'],
    rightComponents?: () => React.ReactNode
}

const TextInputRef = React.forwardRef<Handle, Props>(({ style, rightComponents, ...props }, ref) => {
    React.useImperativeHandle(ref, () => ({
        getValue() { return value },
        focus() { inputRef.current?.focus() },
        blur() { inputRef.current?.blur() },
        clear() { setValue('') },
        setValue(value: any) { setValue(value) },
    }))
    const [value, setValue] = useState(props.valueInit)
    const [look, setLook] = useState(props.look ? true : false)
    const inputRef = useRef<TextInput>(null)
    return (
        <View style={[styles.box, props.containerStyle]}>
            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={setValue}
                placeholder={props.placeholder}
                style={[styles.input, style]}
                secureTextEntry={look}
                autoCapitalize={'none'}
                placeholderTextColor={'#bbb'}
                {...props}
            />
            {rightComponents && rightComponents()}
        </View>
    )
})
export default TextInputRef
TextInputRef.defaultProps = {
    placeholder: 'placeholder',
    look: false,
}
const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#696969',
        fontSize: 15,
        fontWeight: '500',
        width: '90%',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        borderRadius: 5,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },

})
