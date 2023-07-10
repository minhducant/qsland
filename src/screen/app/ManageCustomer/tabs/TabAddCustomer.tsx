import { Button, ScrollView, Text, View, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Block, IconApp, Touch } from '@lib/components';
import { InputText, InputRows, InputDate, InputSelect, InputRadio, Title, InputCCCD, styleInput } from '../components';
import { Log, AppLang, sleep, AppColor } from '@lib/utils';
import { useListCitiesStatic, useListWard, useListSourceCustomer, useListCategories } from '@service/hook';
import { useListDistricts } from '@service/hook';
import { COUNTY_LIST, GENDER_LIST, STATUS_INTERACTIVE_LIST, TYPE_INTERACTIVE_LIST } from '../components/@Status';
import moment from 'moment';
import ButtonApp from '@lib/components/ButtonApp';
import { goBack } from '@navigation';
import { CustomerApi } from '@api/qsland';
import { ValidateObject } from '@lib/utils/ValidateOb/object';
import { DatePost, } from '@lib/utils/date';
import { Dimensions } from 'react-native';
import { LoadingApp, ToastAppError, ToastAppSuccess } from '@components';
import { isObject, isEqual } from 'underscore';
import { useListMe } from '@service/store';
import { useKeyboard } from '@react-native-community/hooks';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
//Them moiw khacsh hag
export default function TabAddCustomer({ update }: any) {
  Log.d1('update', update)
  const Label: any = {
    full_name: { valueInit: update?.full_name, title: "Khách hàng (tên gợi nhớ)", placeholder: 'Nhập', required: true, },
    phone: { valueInit: update?.phone, title: "Số điện thoại", placeholder: 'Nhập', required: true, keyboardType: "number-pad" },
    /** # Nguồn khách hàng */
    source_id: { valueInit: update?.source_id, title: "Nguồn", placeholder: 'Chọn', required: true, },
    category_id: { valueInit: update?.category_id, title: "Dự án quan tâm", titleSelect: "Dự án quan tâm", placeholder: 'Chọn' },
    sex: { valueInit: update?.sex, title: "Giới tính", placeholder: 'Chọn' },
    birthday: { title: "Ngày sinh", placeholder: 'Chọn ngày' },
    email: { valueInit: update?.email, title: "Email", placeholder: 'Nhập' },
    /**##  Thông tin chức minh thư: : */
    cmt_full_name: { valueInit: update?.cmt_full_name, title: "Họ tên khách hàng(trên CMND/CCCD)", placeholder: 'Nhập' },
    cmt_number: { valueInit: update?.cmt_number, title: "CMND/CCCD/Hộ chiếu", placeholder: 'Nhập' },
    cmt_date: { title: "Ngày cấp", placeholder: 'Chọn ngày' },
    cmt_address: { valueInit: update?.cmt_address, title: "Nơi cấp", placeholder: 'Nhập' },
    cb_city_id: { valueInit: update?.cb_city_id, title: "Tỉnh/thành phố", placeholder: 'Chọn tỉnh/thành phố', titleSelect: "Chọn tỉnh thành phố thường trú của bạn" },
    cb_district_id: { valueInit: update?.cb_district_id, title: "Quận/huyện", placeholder: 'Chọn quận/huyện' },
    cb_ward_id: { valueInit: update?.cb_ward_id, title: "Phường/xã", placeholder: 'Chọn phường/xã' },
    cb_address: { valueInit: update?.cb_address, title: "Địa chỉ cụ thể", placeholder: 'Nhập' },
    /**  *   */
    city_id: { valueInit: update?.city_id, title: "Tỉnh/thành phố", placeholder: 'Chọn tỉnh/thành phố', titleSelect: "Chọn tỉnh thành phố của bạn" },
    district_id: { valueInit: update?.district_id, title: "Quận/huyện", placeholder: 'Chọn quận/huyện' },
    ward_id: { valueInit: update?.ward_id, title: "Phường/xã", placeholder: 'Chọn phường/xã' },
    address: { valueInit: update?.address, title: "Địa chỉ cụ thể", placeholder: 'Nhập' },
    images: { valueInit: update?.images, title: "Ảnh xác minh khách hàng (CMND/CCCD)", placeholder: 'Chọn' },
    /**# Quốc tịch */
    country: { valueInit: update?.country, title: "Quốc tịch", placeholder: 'Chọn', titleSelect: "Chọn Quốc tịch của bạn" },
    interactive_status: { valueInit: update?.interactive_status, title: "Chọn tình trạng khách hàng", placeholder: 'Chọn' },
    note: { valueInit: update?.note, title: "Mô tả chi tiết", placeholder: 'Nhập', required: true, },
    interactive_form: { valueInit: update?.interactive_form, title: "Hình thức tương tác", placeholder: 'Chọn', },
    /**Button submit */
    submit: { valueInit: update?.submit, title: "Thêm khách hàng" },
    skip: { valueInit: update?.skip, title: "Bỏ qua" }
  }
  const formRef = useRef<any>({ ...Label })
  const scrollRef = useRef<ScrollView>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [address, setAddress] = useState<any>({
    province_id: null,
    district_id: null,
    province_id_cmt: null,
    district_id_cmt: null,
    country: null
  })
  const Source = useListSourceCustomer()
  const Categories = useListCategories()
  const Cities = useListCitiesStatic()
  const Districts = useListDistricts(address.province_id)
  const Ward = useListWard(address.district_id)
  const CitiesCmt = useListCitiesStatic()
  const DistrictsCmt = useListDistricts(address.province_id_cmt)
  const WardCmt = useListWard(address.district_id_cmt)
  // Log.d('Source', Source.data)
  // 
  const submit = async () => {
    try {
      const body = {
        full_name: formRef.current['full_name']?.getValue(),
        phone: formRef.current['phone']?.getValue(),
        source_id: formRef.current['source_id']?.getValue('id'),
        category_id: formRef.current['category_id']?.getValue('id'),
        //
        //


        city_id: formRef.current['city_id']?.getValue('value'),
        district_id: formRef.current['district_id']?.getValue('value'),
        ward_id: formRef.current['ward_id']?.getValue('value'),
        sex: formRef.current['sex']?.getValue('id'),
        birthday: DatePost(formRef.current['birthday']?.getValue()),
        email: formRef.current['email']?.getValue(),
        cmt_full_name: formRef.current['cmt_full_name']?.getValue(),
        cmt_number: formRef.current['cmt_number']?.getValue(),
        cmt_date: DatePost(formRef.current['cmt_date']?.getValue()),
        cmt_address: formRef.current['cmt_address']?.getValue(),
        cb_city_id: formRef.current['cb_city_id']?.getValue('value'),
        cb_district_id: formRef.current['cb_district_id']?.getValue('value'),
        cb_ward_id: formRef.current['cb_ward_id']?.getValue('value'),
        cb_address: formRef.current['cb_address']?.getValue(),
        address: formRef.current['address']?.getValue(),
        country: formRef.current['country']?.getValue('id'),
        interactive_status: formRef.current['interactive_status']?.getValue('id'),
        note: formRef.current['note']?.getValue(),
        interactive_form: formRef.current['interactive_form']?.getValue('id'),
        images: !update ? null : formRef.current['images']?.getImageJson(),
        cmt_img_before: formRef.current['images']?.getCmtImgBefore(),
        cmt_img_after: formRef.current['images']?.getCmtImgAfter()
      }
      Log.d1('submit2', body)
      // return
      let check = ValidateObject(body, {
        full_name: ['empty', 'Vui lòng nhập tên khách hàng'],
        source_id: ['empty', 'Vui lòng nhập nguồn khách hàng'],
        note: ['empty', 'Vui lòng nhập mô tả chi tiết'],
        phone: [body?.country == "nuoc_ngoai" ? 'phoneOther' : 'phone'],
        email: [body?.email ? "email" : 'none']
      })
      Log.d1('check', check)
      if (!check) return
      LoadingApp.show()
      let res: any = null
      if (update?.id) {
        delete body.phone
        delete body.source_id
        res = await CustomerApi.updateCustomer({ ...body, id: update?.id })
      } else {
        res = await CustomerApi.addCustomer(body)
      }
      Log.g('status', res.status)
      LoadingApp.hide()
      if (res?.status) {
        if (update?.id) {
          ToastAppSuccess('Cập nhật thông tin khách hàng thành công')
        } else {
          goBack()
        }
        onRefresh_ListNe()
      }
      else {
        ToastAppError(res?.mess)
      }
    } catch (error) {
    }
  }
  const skip = () => {
    goBack()
  }
  const { onRefresh: onRefresh_ListNe, } = useListMe()
  const asyncUpdate = async () => {
    let source_id = Source.data.find(i => i.id == update?.source_id)
    if (source_id) formRef.current['source_id']?.setValue(source_id)
    let category_id = Categories.data.find(i => i.id == update?.category_id)
    if (category_id) formRef.current['category_id']?.setValue(category_id)
    let interactive_status = STATUS_INTERACTIVE_LIST.find(i => i.id == update?.interactive_status)
    if (interactive_status) formRef.current['interactive_status']?.setValue(interactive_status)
    let interactive_form = TYPE_INTERACTIVE_LIST.find(i => i.id == update?.interactive_form)
    if (interactive_form) formRef.current['interactive_form']?.setValue(interactive_form)
    let country = COUNTY_LIST.find(i => i.id == update?.country)
    if (country) formRef.current['country']?.setValue(country)
    let sex = GENDER_LIST.find(i => i.id == update?.sex)
    if (sex) formRef.current['sex']?.setValue(sex)
    //
    let city_id = Cities.data.find(i => i['value'] == update?.city_id)
    if (city_id) formRef.current['city_id']?.setValue(city_id)
    let cb_city_id = Cities.data.find(i => i['value'] == update?.cb_city_id)
    if (cb_city_id) formRef.current['cb_city_id']?.setValue(cb_city_id)
    //
    if (update?.district_id) {
      const district_id_res = await CustomerApi.getDetailDistricts({ id: update?.district_id })
      if (district_id_res.status) {
        formRef.current['district_id']?.setValue(district_id_res.data)
      }
    }
    if (update?.cb_district_id) {
      const cb_district_id_res = await CustomerApi.getDetailDistricts({ id: update?.cb_district_id })
      if (cb_district_id_res.status) {
        formRef.current['cb_district_id']?.setValue(cb_district_id_res.data)
      }
    }
    //
    if (update?.ward_id) {
      const ward_id_res = await CustomerApi.getDetailWard({ id: update?.ward_id })
      if (ward_id_res.status) {
        formRef.current['ward_id']?.setValue(ward_id_res.data)
      }
    }
    if (update?.cb_ward_id) {
      const cb_ward_id_res = await CustomerApi.getDetailWard({ id: update?.cb_ward_id })
      if (cb_ward_id_res.status) {
        formRef.current['cb_ward_id']?.setValue(cb_ward_id_res.data)
      }
    }
    if (isObject(update?.images)) {
      const { cmt_img_after, cmt_img_before } = update?.images
      if (cmt_img_after) formRef.current['images']?.setImageAfter({ uri: cmt_img_after })
      if (cmt_img_before) formRef.current['images']?.setImageBefore({ uri: cmt_img_before })
    }
    if (update?.birthday && update?.birthday != "0000-00-00 00:00:00") {
      formRef.current['birthday']?.setValue(moment(update?.birthday).format('YYYY/MM/DD HH:mm:ss'))
    }
    if (update?.cmt_date && update?.cmt_date != "0000-00-00 00:00:00") {
      formRef.current['cmt_date']?.setValue(moment(update?.cmt_date).format('YYYY/MM/DD HH:mm:ss'))
    }

  }
  useEffect(() => {
    asyncUpdate()
  }, [])
  const animate = () => {
    LayoutAnimation.easeInEaseOut()
    setShowInfo(p => !p)

  }

  const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()
  return (
    <Block  >
      <ScrollView ref={scrollRef}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: keyboardShown ? keyboardHeight * 2 : 80,
          paddingHorizontal: 20
        }}>
        {/* Họ tên khách hàng  */}
        <InputText valueInit={update?.full_name} {...Label["full_name"]} ref={ref => formRef.current['full_name'] = ref} />
        {/* Số điện thoại */}
        <InputText valueInit={update?.phone} {...Label["phone"]} type="phone" ref={ref => formRef.current['phone'] = ref} />
        {/* Nhóm khách hàng */}
        <InputSelect data={Source.data} onRefreshData={Source.onRefresh} onOpenModal={() => sleep(100)}  {...Label["source_id"]} ref={ref => formRef.current['source_id'] = ref} />
        {/* Dự án quan tâm*/}
        <InputSelect data={Categories.data} onRefreshData={Categories.onRefresh} onOpenModal={() => sleep(100)}  {...Label["category_id"]} ref={ref => formRef.current['category_id'] = ref} />
        <Touch marginOption={{ top: 10, left: 10, bottom: showInfo ? 15 : 0 }} row centerBetween onPress={animate}>
          <Text style={[styleInput.title, { textTransform: 'uppercase', color: AppColor.primary }]}>
            {"Thông tin thêm"}
          </Text>
          <IconApp name={showInfo ? "arrow-up-outline" : 'arrow-down-outline'} alignSelf='auto' color={AppColor.primary} />
        </Touch>
        <Block h={showInfo ? undefined : 1}>
          {/* <Block h={showInfo ? undefined : 1}> */}
          {/* Quốc gia */}
          <InputSelect onSelected={(e) => setAddress((i: any) => ({ ...i, country: e?.id ?? null }))} data={COUNTY_LIST} keyString="label"  {...Label["country"]} ref={ref => formRef.current['country'] = ref} />
          {/* Giới tính */}
          <InputSelect data={GENDER_LIST} keyString="label"  {...Label["sex"]} ref={ref => formRef.current['sex'] = ref} />
          {/* Ngày sinh */}
          <InputDate   {...Label["birthday"]} ref={ref => formRef.current['birthday'] = ref} />
          {/* Email */}
          <InputText   {...Label["email"]} ref={ref => formRef.current['email'] = ref} />
          {/* Tên cmt */}
          <InputText   {...Label["cmt_full_name"]} ref={ref => formRef.current['cmt_full_name'] = ref} />
          {/* Số ccd */}
          <InputText   {...Label["cmt_number"]} ref={ref => formRef.current['cmt_number'] = ref} />
          {/* Ngày cấp cmt */}
          <InputDate   {...Label["cmt_date"]} ref={ref => formRef.current['cmt_date'] = ref} />
          {/* Nơi cấp */}
          <InputText   {...Label["cmt_address"]} ref={ref => formRef.current['cmt_address'] = ref} />

          <Title title="Địa chỉ liên hệ: " />
          {/* Tinh thanh pho  */}
          <Block h={address.country == "nuoc_ngoai" ? 1 : undefined} overHidden>
            <InputSelect data={Cities.data} keyString="text"{...Label["city_id"]} ref={ref => formRef.current['city_id'] = ref}
              onSelected={async (item) => {
                await setAddress((prev: any) => ({ ...prev, province_id: item?.value }))
                await Districts.updateParamInit({ province_id: item?.value })
                await Districts.onRefresh()
                await formRef.current['district_id']?.clearValue()
                await formRef.current['ward_id']?.clearValue()
                await setAddress({ province_id: item?.value })
              }}
            />
            {/* Quận huyên */}
            <InputSelect data={Districts.data} keyString="text" {...Label["district_id"]} ref={ref => formRef.current['district_id'] = ref}
              onSelected={async (item) => {
                setAddress((prev: any) => ({ ...prev, district_id: item?.value }))
                Ward.updateParamInit({ district_id: item?.value })
                Ward.onRefresh()
                await formRef.current['ward_id']?.clearValue()
              }}
            />
            {/* Xã phường */}
            <InputSelect data={Ward.data} keyString="text" {...Label["ward_id"]} ref={ref => formRef.current['ward_id'] = ref} />
          </Block>
          {/*Địa chỉ  cụ thể */}
          <InputText   {...Label["address"]} ref={ref => formRef.current['address'] = ref} />
          <Title title="Địa chỉ thường trú: " />
          <Block h={address.country == "nuoc_ngoai" ? 1 : undefined} overHidden>
            {/* Tinh thanh pho CCCD */}
            <InputSelect data={CitiesCmt.data} keyString="text" {...Label["cb_city_id"]} ref={ref => formRef.current['cb_city_id'] = ref}
              onSelected={async (item) => {
                await setAddress((prev: any) => ({ ...prev, province_id: item?.value }))
                await DistrictsCmt.updateParamInit({ province_id: item?.value })
                await DistrictsCmt.onRefresh()
                await formRef.current['cb_district_id']?.clearValue()
                await formRef.current['cb_ward_id']?.clearValue()
                await setAddress({ province_id: item?.value })
              }}
            />
            {/* Quận huyên trên CCCD */}
            <InputSelect data={DistrictsCmt.data} keyString="text" {...Label["cb_district_id"]} ref={ref => formRef.current['cb_district_id'] = ref}
              onSelected={async (item) => {
                setAddress((prev: any) => ({ ...prev, district_id: item?.value }))
                WardCmt.updateParamInit({ district_id: item?.value })
                WardCmt.onRefresh()
                await formRef.current['cb_ward_id']?.clearValue()
              }} />
            {/* Xã phường */}
            <InputSelect data={WardCmt.data} keyString="text"{...Label["cb_ward_id"]} ref={ref => formRef.current['cb_ward_id'] = ref} />
          </Block>
          {/* Địa chỉ cụ thể */}
          <InputText   {...Label["cb_address"]} ref={ref => formRef.current['cb_address'] = ref} />
          {/* Ảnh */}
          {/* <InputSelect   {...Label["images"]} ref={ref => formRef.current['images'] = ref} /> */}
          {/* <InputImages   {...Label["images"]} ref={ref => formRef.current['images'] = ref} /> */}

          <InputCCCD {...Label["images"]} ref={ref => formRef.current['images'] = ref} />
          {/* </Block> */}
        </Block>
        <Block h={update ? 1 : undefined}>
          {/* Trạng thái khách hàng */}
          <InputRadio data={STATUS_INTERACTIVE_LIST} keyString="label" {...Label["interactive_status"]} ref={ref => formRef.current['interactive_status'] = ref} />
          {/* Hình thức tương tác */}
          <InputRadio data={TYPE_INTERACTIVE_LIST} keyString="label" {...Label["interactive_form"]} ref={ref => formRef.current['interactive_form'] = ref} />
        </Block>
        {/* Ghi chú */}
        <InputRows   {...Label["note"]} ref={ref => formRef.current['note'] = ref} />
        <ButtonApp title={update ? AppLang.cap_nhat_khach_hang : AppLang.them_khach_hang} onPress={submit} marginOption={{ top: 30 }} />
        <ButtonApp     {...Label['skip']} onPress={skip} background="transparent" color='gray' />
        {/* <InputDate  {...Label["cmt_date"]} placeholder="Chon" /> */}
      </ScrollView>
      <ScroolTo scrollRef={scrollRef} />
    </Block >
  )
}

const ScroolTo = ({ scrollRef }: any) =>
  <Block positionOption={{ right: 5, bottom: Dimensions.get('screen').height * 0.2 }} >
    <Touch onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} bg={AppColor.primary} borderCircle padV={3} >
      <IconApp name="arrow-up-outline" color={'#fff'} size={20} />
    </Touch>
    <Touch marT={10} onPress={() => scrollRef.current?.scrollToEnd()} bg={AppColor.primary} borderCircle padV={3} >
      <IconApp name="arrow-down-outline" color={'#fff'} size={20} />
    </Touch>
  </Block>
