import { StyleSheet } from 'react-native'
import React from 'react'
import { STATUS_ADMIN_DENY } from '@screen/app/DenyAdmin/components/api'
import { useListCampaignCustomer } from '@service/hook'
import { AppDate } from '@utils/date'
import { AppLang } from '@assets/langs'
import { AppColor } from '@assets/colors'
import { isString } from 'underscore'
import { Block, Touch } from '@mylib/UIKit'
import ButtonApp from '@components/ButtonApp'
import { TextApp } from '@components'
export function ItemCustomerDeny({ item, index, onPress, onSend, onCancel }: any) {
    const Status =
        Object.values(STATUS_ADMIN_DENY).find(({ id }) => id == item?.status) ??
        STATUS_ADMIN_DENY.vi_pham
    const chien_dich = useListCampaignCustomer().dataKey
    const styleContainer = StyleSheet.flatten([
        styles.container,
        {
            borderTopWidth: index == 0 ? 0.8 : 0.2,
            borderColor: Status?.color,
            shadowColor: Status?.color,
        },
    ])
    const data = {
        full_name: item?.full_name,
        status_name: Status?.label,
        status_color: Status?.color,
        chien_dich: chien_dich[item?.campaign_id]?.name,
        thu_hoi: AppDate.format3(item?.created_at),
        giai_trinh: AppDate.format3(item?.time_send_explanation),
        ngay_duyet: AppDate.format3(item?.updated_at),
        phan_bo: AppDate.format3(item?.allotment_time),
    }
    return (
        <>
            {__DEV__ && (
                <TextApp color='red'>
                    {'user_id_manager='}{JSON.stringify(item?.user_id_manager)}
                    {'\nid='}{JSON.stringify(item?.id)}
                    {'\nstatus='}{JSON.stringify(item?.status)}
                </TextApp>
            )}
            <Touch row centerH styleBox={styleContainer} onPress={onPress}>
                <Block flex1>
                    <TextApp bold>
                        {index + 1}
                        {'. '}
                        {data.full_name}
                        {__DEV__ ? `  [${item?.status}]` : ''}
                    </TextApp>
                    <Info value={data.phan_bo} label={AppLang('phan_bo').concat(':')} />
                    <Info value={data.thu_hoi} label={AppLang('thu_hoi').concat(':')} />
                    {item?.status != STATUS_ADMIN_DENY.vi_pham.id &&
                        <Info value={data.giai_trinh} label={AppLang('giai_trinh').concat(':')} />
                    }
                    <Info
                        value={data.chien_dich}
                        label={AppLang('chien_dich').concat(':')}
                    />
                </Block>
                <Block mid marL={5}>
                    <TextApp style={{ fontWeight: '500' }} color={Status?.color}>{Status?.label}</TextApp>
                    <Block marT={5}>
                        {(item?.status != STATUS_ADMIN_DENY.vi_pham.id) &&
                            <TextApp style={{ marginVertical: 5 }} size={14}>{data.ngay_duyet}</TextApp>
                        }
                        {item?.status == STATUS_ADMIN_DENY.vi_pham.id &&
                            <ButtonApp title={AppLang('gui_giai_trinh')} onPress={onSend} style={{ paddingVertical: 8 }} />
                        }
                        {item?.status == STATUS_ADMIN_DENY.cho_duyet.id &&
                            <ButtonApp title={AppLang('yeu_cau_huy')} onPress={onCancel} style={{ paddingVertical: 8 }}
                                background={AppColor('txt_origin')} />
                        }
                    </Block>
                </Block>
            </Touch>
        </>
    )
}
const Info = ({
    value,
    label,
    textStyle,
}: {
    textStyle?: any
    value: any
    label?: string
}) => {
    return (
        <Block row alignCenter marT={2}>
            {isString(label) &&
                <TextApp style={textStyle}>
                    {label}
                    <TextApp  >{' '}{value}</TextApp>
                </TextApp>
            }
        </Block>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 15,
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
})
