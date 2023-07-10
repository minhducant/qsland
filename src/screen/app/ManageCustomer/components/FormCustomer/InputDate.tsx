import React, { useState, useImperativeHandle } from 'react';
import moment from 'moment';
import { Image, Text, View, } from 'react-native';

import InputTitle from './InputTitle';
import { styleInput } from './styleInput';
import { IconApp, Touch } from '@lib/components';
import { DateShow } from '@lib/utils/date';
import { ModalDate } from '@components/selected/Dates/ModalDate';
import { Log } from '@utils';

const InputDate = React.forwardRef<any, any>(({ title, valueInit = null, required = false, styleText, placeholder }, ref) => {
    // Log.d('valueInit', valueInit)
    const [date, setDate] = useState(valueInit ?? null);
    const [showPickDate, setShowPickDate] = useState(false);
    useImperativeHandle(ref, () => ({
        getValue: () => {
            if (date) return moment(date).format('YYYY/MM/DD')
            return null
        },
        setValue: (value: any) => {
            setDate(value)
        },
        clearValue: () => {
            setDate(null)
        },
    }));
    const dateRef1 = React.useRef<any>(null)
    return (
        <View style={styleInput.inputContainer}>
            <InputTitle title={title} required={required} />
            <View style={styleInput.inputButton}>
                <Touch
                    h={40}
                    row
                    centerBetween
                    onPress={async () => {
                        dateRef1.current?.open()
                    }}
                    activeOpacity={0.5}>
                    <Text style={styleText}>{date ? DateShow(date) : placeholder}</Text>
                    <IconApp name="chevron-down-outline" alignSelf='auto' color='gray' />
                </Touch>
            </View>
            <ModalDate
                ref={dateRef1}
                onCancel={() => setShowPickDate(false)}
                onSelectDate={value => setDate(value)}
            />
        </View>
    );
});

export default InputDate;
