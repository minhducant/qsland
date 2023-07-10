import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Block, IconApp, InputRows, TextApp, Touch } from '@lib/components';
import { useListCampaign } from '@service/hook';
import { AppLang, AppLinking, AppColor } from '@lib/utils';
import { STATUS_HISTORY, STATUS_INTERACTIVE, TYPE_INTERACTIVE, TYPE_RECEIPT } from '../components';
import { Dimensions } from 'react-native';
import { useRef } from 'react';
import ModalAddHistory from '../components/ModalAddHistory';
import moment from 'moment';
import { LayoutApp } from '@components/layout';
import { AppType } from '@utils/type';
export default function ListCustomerSupport({ item, id }: any) {
  const { data, onLoadMore, onRefresh, loading, } = useListCampaign(id)
  // Log.d('item', item)
  // Log.d('data', data)
  const addRef = useRef<any>(null)
  return (
    <LayoutApp
      forceInset={{ vertical: 'never' }}
      forceInsetBot={{ vertical: 'never', bottom: 'always' }}
      styleBot={{ backgroundColor: '#fff' }}
    >
      <Block flex1  >
        {/* {__DEV__ && <Text>{'ID CUstomer'}{item.id}</Text>} */}
        <Block row centerBetween pad={10}>
          <Block row alignCenter>
            <IconApp name="person-outline" />
            <TextApp >{AppLang.khach_hang.concat(': ')}
              <TextApp bold > {item?.full_name}</TextApp>
            </TextApp>
          </Block>
          <IconApp
            styleContainer={{ borderWidth: 1, borderRadius: 100, padding: 5, borderColor: AppColor.primary }}
            color={AppColor.primary} name="call-outline" onPress={() => AppLinking.call(item?.phone)} />
        </Block>
        <Block flex1>
          <FlatList
            data={data}
            refreshing={loading}
            onRefresh={onRefresh}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, padding: 10, paddingBottom: 60 }}
            onEndReached={onLoadMore}
            keyExtractor={(_item, index) => _item?.id}
            ListHeaderComponent={() => <Item0 item={item} />}
            renderItem={({ item, index }) =>
              <Item
                item={item}
              />
            }
          />
          <AddButton onPress={() => addRef.current?.open()} />
        </Block>
        <ModalAddHistory ref={addRef} customer_id={item?.id} onRefresh={onRefresh} />
      </Block >
    </LayoutApp>
  )
}
const AddButton = ({ onPress }: any) => {
  return (
    <Touch onPress={onPress} padL={10} bg={'#3386BD'} row centerBetween positionOption={{ bottom: 0, right: 10 }} h={45} borderCircle  >
      <TextApp bold color='white'>{"Phản hồi CSKH"}</TextApp>
      <IconApp styleContainer={{ marginLeft: 10, backgroundColor: '#0796a9', borderRadius: 1000, height: 45, width: 45 }} name="add" color='white' alignSelf='auto' />
    </Touch>
  )
}

const Item0 = ({ item, onPress, }: { item: AppType.ItemCustomerMe, onPress?: () => void }) => {
  if (item?.create_type == 1) return null
  const { color, label2 } = TYPE_RECEIPT[item?.create_type] || {}

  return (
    <Touch onPress={onPress} borderOption={{ top: 1, color: '#ddd' }} paddingFlex={{ vertical: 20, horizontal: 10 }}>
      <Block row centerBetween>
        <TextApp color={color} bold >{label2}</TextApp>
        <TextApp color={color}>{moment(item?.created_at).format("HH:mm DD-MM-YYYY")}</TextApp>
      </Block>
    </Touch >
  )
}
const Item = ({ item, onPress }: { item: AppType.ListCampaign, onPress?: () => void }) => {
  const interactive_status = STATUS_INTERACTIVE[item?.interactive_status] || {}
  const statusForm = TYPE_INTERACTIVE[item?.interactive_form] || {}
  const action = STATUS_HISTORY[item?.action] || {}
  if (item?.action == "thu_hoi")
    return (
      <Touch onPress={onPress} borderOption={{ top: 0.8, bottom: 0.8, color: '#ddd' }} paddingFlex={{ vertical: 20, horizontal: 10 }}>
        <Block row centerBetween>
          <TextApp bold color={action?.color}>{action?.label}</TextApp>
          <TextApp>{moment(item?.created_at).format("HH:mm DD-MM-YYYY")}</TextApp>
        </Block>
      </Touch>
    )
  if (item?.action == "phan_bo")
    return (
      <Touch onPress={onPress} borderOption={{ top: 0.8, bottom: 0.8, color: '#ddd' }} paddingFlex={{ vertical: 20, horizontal: 10 }}>
        <Block row centerBetween>
          <TextApp bold color={action?.color}>{action?.label}</TextApp>
          <TextApp>{moment(item?.created_at).format("HH:mm DD-MM-YYYY")}</TextApp>
        </Block>
      </Touch>
    )
  return (
    <Touch onPress={onPress} borderOption={{ top: 0.8, bottom: 0.8, color: '#ddd' }} paddingFlex={{ vertical: 20, horizontal: 10 }}>
      <Block row centerBetween>
        <TextApp bold>{action?.label}</TextApp>
        <TextApp>{moment(item?.created_at).format("HH:mm DD-MM-YYYY")}</TextApp>
      </Block>
      <Block row centerBetween>
        <TextApp>{'Tình trạng'}</TextApp>
        <Touch mid minW={Dimensions.get('screen').width * 0.3} paddingFlex={{ horizontal: 5, vertical: 2 }} bg={'#eee'} borderR={5}>
          <TextApp bold color={interactive_status?.color}>{interactive_status?.label}</TextApp>
        </Touch>
      </Block>
      <Block >
        <TextApp>{'Ghi chú: '}{item?.note}</TextApp>
        <TextApp>{'Tương tác: '}{statusForm?.label}</TextApp>
      </Block>
    </Touch>
  )
}


