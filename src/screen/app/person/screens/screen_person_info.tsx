import { Image, RefreshControl, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Block, IconC, ImageC, Touch } from '@mylib'
import { Log } from '@utils'
import { TextApp } from '@components'
import { AppImage } from '@assets/image'
import { AppLang } from '@assets/langs'
import { uriImg } from '@utils'
import { AppColor } from '@assets/colors'
import { getImageAvatar } from '../api'
import { useUser, useUserInfo } from '@service/hook'
import { DateShow } from '@utils/date'
import ScreenApp from '@components/layout/ScreenApp'
import { SelectFile } from '@lib/components/image/SelectFile'
import { isArray, isEmpty } from 'underscore'
import { ToastAppSuccess } from '@components/Toast'

export default function ScreenPersonInfo() {
  Log.d('ScreenPersonInfo')

  const { data, onRefresh } = useUserInfo()

  const refSelect = useRef<any>(null)

  const emptyData = ''
  const getGender = (type: any) => {
    if (type == 1) return 'Nam'
    if (type == 2) return 'Nữ'
    if (type == 3) return 'Khác'
    // Log.e('getGender', type)
    return ''
  }
  const ListData = [
    { label: 'Mã nhân viên', content: data?.code_staff ?? emptyData },
    { label: 'Chức vụ', content: data?.position },
    { label: 'Phòng ban', content: emptyData },
    { label: 'Tên:', content: data?.full_name },
    { label: 'Giới tính', content: getGender(data?.gender) },
    { label: 'Ngày sinh', content: DateShow(data?.birthday, emptyData) },
    { label: 'Nơi sinh:', content: data?.address ?? emptyData },
    { label: 'Số điện thoại', content: data?.phone_contact },
    { label: 'Email liên hệ', content: data?.email_contact },
    { label: 'Mã bảo hiểm xã hội:', content: data.social_insurance_code ?? '' },
    { label: 'CMND:', content: data?.cmt_number ?? emptyData },
    { label: 'Ngày cấp:', content: DateShow(data?.cmt_date, emptyData) },
    { label: 'Nơi cấp:', content: data?.cmt_address ?? emptyData },
    { label: 'Địa chỉ tạm trú:', content: data?.address ?? emptyData },
  ]
  const [image, setImage] = useState(null)
  // Log.d('images', image)
  // Log.d('sEmpty(image)', !isEmpty(image))
  const onSave = async () => {
    const body = {
      image,
    }
    const res = { status: true } //await CommonApi.updateUserInfo(body)
    if (res.status) {
      ToastAppSuccess(AppLang('thanh_cong'))
      setImage(null)
    } else ToastAppSuccess(res.mess)
  }
  return (
    <ScreenApp
      back
      title={AppLang('thong_tin_nhan_vien')}
      renderRight={
        <Touch
          hidden={isEmpty(image)}
          onPress={onSave}
          positionA
          styleBox={{ right: 10, top: 15 }}>
          <IconC name='checkmark-outline' color='#fff' />
        </Touch>
      }>
      <Block flex1 bgW>
        <ScrollView
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 60 }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }>
          <Block mid>
            <Touch onPress={() => refSelect.current?.open()}>
              <Image
                // imageDefault={AppImage('logo_bg1')}
                source={isEmpty(image) ? getImageAvatar(data?.avatar) : image}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  resizeMode: 'cover',
                  borderWidth: 0.5,
                  borderColor: '#ddd',
                  zIndex: 9,
                }}
              />
              <Touch
                onPress={() => refSelect.current?.open()}
                background='#fff'
                borderW1
                borderC={'#ddd'}
                borderCircle
                pad5
                activeOpacity={1}
                styleBox={{
                  position: 'absolute',
                  bottom: 0,
                  right: -15,
                  zIndex: 8,
                }}>
                <IconC
                  name={'pencil'}
                  type='FontAwesome'
                  color={AppColor('primary')}
                  size={22}
                />
              </Touch>
            </Touch>
            <TextApp center size={17} bold style={{ marginTop: 10 }}>
              {data?.full_name}
            </TextApp>
          </Block>
          <Block>
            {__DEV__ && (
              <TextApp colorR>
                {'\nuser_id='}
                {data?.user_id}
              </TextApp>
            )}
            {ListData.map(({ label, content }, key) => (
              <ItemInfo {...{ label, content, key }} />
            ))}
          </Block>
        </ScrollView>
      </Block>
      <SelectFile
        ref={refSelect}
        selectionLimit={1}
        onSelectedFile={(data: any) => {
          Log.d('data', data)
          if (isArray(data) && data.length > 0) {
            setImage(data[0])
          }
          refSelect.current?.close()
        }}
        options={['camera', 'library']}
      />
    </ScreenApp>
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
