import React from 'react';
import { View } from 'react-native';

import { Input, } from '@lib/components';
import InputTitle from './InputTitle';
import { placeholderTextColor, styleInput } from './styleInput'
import { InputProps } from '@lib/components/Input';
import { InputMask as InputMasker, InputRows as InputRowss, InputMaskProps, InputRowsProps } from './InputForm'
interface Props extends InputProps {
    title?: any
    required?: boolean
}
const InputText = React.forwardRef<any, Props>(({ title, valueInit, required = false, ...rest }, ref) => {
    return (
        <View style={styleInput.inputContainer}>
            <InputTitle title={title} required={required} />
            <View style={styleInput.inputButton}>
                <Input ref={ref} valueInit={valueInit} style={{}} placeholderTextColor={placeholderTextColor} {...rest} />
            </View>
        </View>
    );
});
const InputMask = React.forwardRef<any, Props & InputMaskProps>(({ title, valueInit, required = false, ...rest }, ref) => {
    return (
        <View style={styleInput.inputContainer}>
            <InputTitle title={title} required={required} />
            <View style={styleInput.inputButton}>
                <InputMasker ref={ref} valueInit={valueInit} style={{}} placeholderTextColor={placeholderTextColor}{...rest} />
            </View>
        </View>
    );
});
const InputRows = React.forwardRef<any, Props & InputRowsProps>(({ title, valueInit, required = false, ...rest }, ref) => {
    return (
        <View style={styleInput.inputContainer}>
            <InputTitle title={title} required={required} />
            <View style={[styleInput.inputButton, { borderRadius: 10, paddingBottom: 5 }]}>
                <InputRowss ref={ref} valueInit={valueInit} style={{}} placeholderTextColor={placeholderTextColor} {...rest} />
            </View>
        </View>
    );
});
export {
    InputText,
    InputMask,
    InputRows
}

