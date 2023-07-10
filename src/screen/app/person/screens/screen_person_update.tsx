import { Image, RefreshControl, ScrollView } from 'react-native'
import React from 'react'
import { HeaderC, LayoutApp } from '@components/layout'
import { goBack, navigate } from '@navigation'
import { Block, IconC, ImageC, Touch } from '@mylib'
import { Log } from '@utils'
import { TextApp } from '@components'
import { AppImage } from '@assets/image'

import { AppLang } from '@assets/langs'
import { uriImg } from '@utils'
import { AppColor } from '@assets/colors'
import { useUser } from '@service/hook'
import { DateShow } from '@utils/date'

export default function ScreenPersonInfo() {
  const data = useUser()
  // Log.d1('data', data)
  const getAvatars = () => {
    if (data?.avatar) return uriImg(data?.avatar)
    return AppImage('logo_bg1')
  }
  const emptyData = ''
  const ListData = [
    { label: 'Mã nhân viên', content: data?.id ?? emptyData },
    { label: 'Ngày bắt đầu làm việc', content: emptyData },
    { label: 'Chức vụ', content: data?.cmt_status },
    { label: 'Phòng ban', content: emptyData },
    { label: 'Tên:', content: data?.full_name },
    { label: 'Giới tính', content: data?.gender == 1 ? 'Nam' : 'Nữ' },
    { label: 'Ngày sinh', content: DateShow(data?.birthday, emptyData) },
    { label: 'Nơi sinh:', content: data?.address ?? emptyData },
    { label: 'Dân tộc', content: emptyData },
    { label: 'Số điện thoại', content: data?.phone_contact },
    { label: 'Mã số thuế:', content: emptyData },
    { label: 'CMND:', content: data?.cmt_number ?? emptyData },
    { label: 'Ngày cấp:', content: DateShow(data?.cmt_date, emptyData) },
    { label: 'Nơi cấp:', content: data?.cmt_address ?? emptyData },
    { label: 'Địa chỉ tạm trú:', content: data?.cmt_address ?? emptyData },
  ]
  return (
    <LayoutApp isBack>
      <HeaderC
        title={AppLang('thong_tin_nhan_vien')}
        left={{
          show: true,
          onPress: () => goBack(),
        }}
      />
      <Block flex1 bgW>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isLoading}
        //     onRefresh={() => onRefresh()}
        //   />
        // }
        >
          <Block>
            <Block>
              <Image
                // imageDefault={AppImage('logo_bg1')}
                source={getAvatars()}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 40,
                  resizeMode: 'cover',
                }}
              />
              <TextApp center size={17}  >
                {data?.full_name}
              </TextApp>
            </Block>
          </Block>
          <Block>
            {ListData.map(({ label, content }, key) => (
              <ItemInfo {...{ label, content, key }} />
            ))}
          </Block>
        </ScrollView>
      </Block>
    </LayoutApp>
  )
}

export const ItemInfo = (item: any) => {
  return (
    <Block h={55} row pad={15} centerH borderBW={1} borderC='#ddd'>
      <TextApp size16 color='#000'>
        {item.label}
      </TextApp>
      <TextApp color={AppColor('txt_gray')} size={15}>
        {item.content}
      </TextApp>
    </Block>
  )
}
