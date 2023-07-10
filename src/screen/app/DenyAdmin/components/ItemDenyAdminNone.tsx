import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block, TextApp, Touch, IconApp, AppStyle } from '@lib/components'
import { STATUS_INTERACTIVE } from '../../ManageCustomer/components/@Status'
import { isString } from 'underscore'
import { AppLang } from '@assets/langs'
import { AppColor } from '@assets/colors'
import moment from 'moment'
import { useListCampaignCustomer, useListStaff } from '@service/hook'
import { AppDate } from '@utils/date'
import { DefineItem, MappedItem } from '@utils/type/core';
let _key = [
  "id", "user_id_sale", "campaign_id", "reason", "created_at",
  "updated_at", "allotment_time", "images", "desc", "status", "time_send_explanation",
  "customer_id", "category_id", "full_name", "phone", "email", "source_id", "name_sale"
] as const
export default function ItemDenyAdminNone({ item, index, onPress, }: DefineItem<MappedItem<typeof _key>>) {
  const { color, label } = STATUS_INTERACTIVE[item.interactive_status] || {
    label: 'KH Mới',
    color: '#E53030',
  }
  const chien_dich = useListCampaignCustomer().dataKey
  const { dataKey } = useListStaff()

  const styleContainer = StyleSheet.flatten([
    styles.container,
    {
      borderTopWidth: index == 0 ? 0.8 : 0.2,
      borderColor: color,
      shadowColor: color,
    },
  ])
  const data = {
    full_name: item?.full_name,
    sale_name: item?.name_sale ?? dataKey[item?.user_id_sale]?.full_name,
    chien_dich: chien_dich[item?.campaign_id]?.name,
    thu_hoi: AppDate.format3(item?.created_at),
    // giai_trinh: AppDate.format3(item?.time_send_explanation),
    ngay_duyet: AppDate.format3(item?.updated_at),
  }
  return (
    <>
      {__DEV__ && (
        <TextApp color='red'>
          user_id_sale {JSON.stringify(item?.user_id_sale)}
          \\id {JSON.stringify(item?.id)}
        </TextApp>
      )}
      <Touch row centerBetween styleBox={styleContainer} onPress={onPress}>
        <Block>
          <TextApp style={AppStyle.title}>
            {index + 1}
            {'. '}
            {data.full_name}
            {__DEV__ ? `  [${item?.status}]` : ''}
          </TextApp>
          <Info value={data.sale_name} label={AppLang('sale').concat(':')} />
          <Info value={data.thu_hoi} label={AppLang('thu_hoi').concat(':')} />
          {/* <Info value={data.giai_trinh} label={AppLang('giai_trinh').concat(':')} /> */}
          <Info
            value={data.chien_dich}
            label={AppLang('chien_dich').concat(':')}
            color={AppColor('primary')}
          />
        </Block>
        <Block></Block>
      </Touch>
    </>
  )
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
})

const Info = ({
  value,
  icon,
  label,
  color,
  textStyle,
}: {
  textStyle?: any
  value: any
  icon?: any
  label?: string
  color?: string
}) => {
  return (
    <Block row alignCenter marT={2}>
      {isString(icon) && <IconApp name={icon} size={18} />}
      {isString(label) && <TextApp style={[AppStyle.content]}>{label}</TextApp>}
      <TextApp
        style={[AppStyle.content, { marginLeft: 5, color: color }, textStyle]}>
        {value || ''}
      </TextApp>
    </Block>
  )
}
