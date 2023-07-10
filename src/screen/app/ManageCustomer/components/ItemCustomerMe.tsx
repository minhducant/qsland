import { StyleSheet } from 'react-native';
import React from 'react';
import { Block, TextApp, Touch, AppStyle, } from '@lib/components';
import { STATUS_INTERACTIVE, } from './@Status';
import moment from 'moment';
import { Info, } from './Info';
import { IconC, TouchScale } from '@mylib/UIKit';
import { AppColor } from '@assets/colors';
export function ItemCustomerMe({ item, index, onPress, onCall }: any) {
    const { color, label } = STATUS_INTERACTIVE[item.interactive_status] || {
        label: 'KH Mới',
        color: '#E53030',
    };
    const styleContainer = StyleSheet.flatten([
        styles.container,
        {
            borderTopWidth: index == 0 ? 0.8 : 0.2,
            borderColor: color,
            shadowColor: color,
        },
    ]);
    const thoi_gian = () => {
        if (item?.final_date)
            return moment(item?.final_date).format('HH:mm DD/MM/YYYY');
        return moment(item?.created_at).format('HH:mm DD/MM/YYYY');
        return 'null';
    };
    return (
        <>
            {__DEV__ && (
                <TextApp color='red'>
                    {'id='}{JSON.stringify(item?.id)}
                    {'\ncreate_type='}{JSON.stringify(item?.create_type)}
                </TextApp>
            )}
            <Touch onPress={onPress} styleBox={styleContainer}>
                <Block row centerBetween>
                    <Block>
                        <TextApp style={[AppStyle.title, { marginBottom: 5 }]}>
                            {item?.full_name ?? 'Khách hàng'}
                        </TextApp>
                        <Info value={item?.phone} icon="call-outline" />
                        <Info value={item?.email} icon="mail-outline" />
                    </Block>
                    <Block alignItems="flex-end" flex1 padL={10}>
                        <Info
                            textStyle={{ fontSize: 10, color: 'gray', textAlign: 'center' }}
                            value={thoi_gian()}
                            label={''}
                        />
                        <TouchScale
                            scaleValue={1.3}
                            marT={5}
                            borderW={1}
                            borderCircle
                            mid
                            square={40}
                            pad={2}
                            onPress={onCall}
                            borderC={AppColor('primary')}>
                            <IconC name="call" size={30} color={AppColor('primary')} />
                        </TouchScale>
                    </Block>
                </Block>
                <Block marT={5}>
                    <TextApp style={[AppStyle.title, { color: color }]}>{label}</TextApp>
                </Block>
            </Touch>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        paddingRight: 20,
        marginBottom: 15,
        paddingHorizontal: 5,
        borderRadius: 10,
        elevation: 2,
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.1,
        borderWidth: 0.5,
        borderColor: '#eee',
        borderLeftWidth: 5,
    },
});
