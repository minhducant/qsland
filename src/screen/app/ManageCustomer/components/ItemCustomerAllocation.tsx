import { StyleSheet } from 'react-native';
import React from 'react';
import { Block, TextApp, Touch, AppStyle, } from '@lib/components';
import { ALLOCATION_STATUS, STATUS_INTERACTIVE, } from './@Status';
import moment from 'moment';
import { Info } from './Info';
import { calculateTimeDifference } from '@utils/date';
import { IconC } from '@mylib/UIKit';
import { AppColor } from '@assets/colors';
export function ItemCustomerAllocation({
    item,
    index,
    onPress,
    onCall,
}: any) {
    let { color, label } = STATUS_INTERACTIVE[item.interactive_status] || {};
    if (item.status_allocation != ALLOCATION_STATUS.da_phan_bo.id) color = 'black'
    const styleContainer = StyleSheet.flatten([
        styles.container,
        {
            borderTopWidth: index == 0 ? 0.8 : 0.2,
            borderColor: color,
            shadowColor: color,

        },
    ]);
    const [timer, setTimer] = React.useState<any>();

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (item?.create_date && item?.rule_time) {
            const endTime = calculateTimeDifference(item.create_date, item.rule_time);
            setTimer(endTime);
            intervalId = setInterval(() => {
                setTimer((prevTimer: any) => prevTimer - 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [item]);

    const formatTime = (time: any) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    // if (item.status_allocation != ALLOCATION_STATUS.da_phan_bo.id) return null
    return (
        <>
            {__DEV__ && (
                <TextApp color='red'>
                    {'create_type='}{JSON.stringify(item?.create_type)}
                    {'\nid='}{JSON.stringify(item?.id)}
                    {'\ninteractive_status='}{JSON.stringify(item?.interactive_status)}
                    {'\nstatus_allocation='}{JSON.stringify(item?.status_allocation)}
                </TextApp>
            )}
            <Touch
                onPress={onPress}
                styleBox={styleContainer}
            >
                <Block row centerBetween>
                    <Block>
                        <TextApp style={AppStyle.title}>
                            {index + 1}
                            {'. '}
                            {item?.full_name}
                        </TextApp>
                        <Info value={item?.phone} icon="call-outline" />
                        <Info value={item?.email} icon="mail-outline" />
                    </Block>
                    <Block alignItems="flex-end" flex1 padL={10}>
                        <Info
                            textStyle={{ fontSize: 10, color: 'gray', textAlign: 'center' }}
                            value={moment(item?.create_date).format('HH:mm DD/MM/YYYY')}
                            label={''}
                        />
                        <Touch
                            disabled={
                                item.status_allocation !== 2 ? false : timer > 0 ? false : true
                            }
                            marT={5}
                            borderW={1}
                            borderCircle
                            mid
                            square={40}
                            pad={2}
                            onPress={onCall}
                            borderC={timer > 0 ? AppColor('primary') : AppColor('txt_gray')}>
                            <IconC
                                name="call"
                                size={30}
                                color={AppColor('primary')}
                            />
                        </Touch>
                    </Block>
                </Block>
                <Block row centerBetween>
                    <Block marT={5}>
                        <TextApp style={[AppStyle.title, { color: color }]}>{label}</TextApp>
                    </Block>
                    {timer > 0 && item.status_allocation === 2 && (
                        <TextApp bold color={AppColor('txt_red')}>{`Còn ${formatTime(
                            timer,
                        )}`}</TextApp>
                    )}
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