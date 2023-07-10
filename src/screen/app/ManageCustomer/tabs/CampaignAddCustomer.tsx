import { Button, ScrollView, Text, View, Animated, Platform, UIManager, LayoutAnimation } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Block, IconApp, Touch } from '@lib/components';
import { InputText, InputRows, InputDate, InputSelect, InputRadio, Title, InputCCCD, styleInput } from '../components';
import { Log, AppColor } from '@lib/utils';
import { useListCitiesStatic, useListWard, useListBuildingProject, useListCampaignProject } from '@service/hook';
import { useListDistricts } from '@service/hook';
import { COUNTY_LIST, GENDER_LIST, } from '../components/@Status';
import moment from 'moment';
import ButtonApp from '@lib/components/ButtonApp';
import { goBack, navigate } from '@navigation';
import { CustomerApi, TransactionApi } from '@api/qsland';
import { ValidateObject } from '@lib/utils/ValidateOb/object';
import { DatePost, } from '@lib/utils/date';
import { Dimensions } from 'react-native';
import { LoadingApp, TextApp, ToastAppError, ToastAppSuccess } from '@components';
import { isObject, isEqual } from 'underscore';
import { useListCategory, useListMe } from '@service/store';
import { useKeyboard } from '@react-native-community/hooks';
import ModalSelectCustomer from '../components/ModalSelectCustomer';
import { IconC } from '@mylib/UIKit';
import { AppLang } from '@assets/langs';
import InputSelectMore from '../components/FormCustomer/InputSelectMore';
import { useHookForm } from './hook';
import { convertDateApp, convertDateMoment } from '@utils/date';
import { decodeJson } from '@utils/array';
import { convertHttpToHttps } from '@utils/index';
//Them moiw khacsh hag
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const Rest: any = {
  category_id: { title: AppLang('du_an'), placeholder: AppLang('chon'), required: true, },
  building_id: { title: AppLang('toa'), placeholder: AppLang('chon'), required: true, },
  campaign_sale_id: { title: AppLang('chien_dich'), placeholder: AppLang('chon'), required: true, },
  full_name: { title: "Họ tên khách hàng", placeholder: 'Nhập', required: true, },
  phone: { title: "Số điện thoại", placeholder: 'Nhập', required: true, keyboardType: "number-pad" },
  sex: { title: "Giới tính", placeholder: 'Chọn', required: true, },
  birthday: { title: "Ngày sinh", placeholder: 'Chọn ngày', required: true, },
  email: { title: "Email", placeholder: 'Nhập', required: true, },
  cmt_full_name: { title: "Họ tên khách hàng(trên CMND/CCCD)", placeholder: 'Nhập', required: true, },
  cmt_number: { title: "CMND/CCCD/Hộ chiếu", placeholder: 'Nhập', required: true, },
  cmt_date: { title: "Ngày cấp", placeholder: 'Chọn ngày', required: true, },
  cmt_address: { title: "Nơi cấp", placeholder: 'Nhập', required: true, },
  cb_city_id: { title: "Tỉnh/thành phố", placeholder: 'Chọn tỉnh/thành phố', titleSelect: "Chọn tỉnh thành phố thường trú của bạn", required: true, },
  cb_district_id: { title: "Quận/huyện", placeholder: 'Chọn quận/huyện', required: true, },
  cb_ward_id: { title: "Phường/xã", placeholder: 'Chọn phường/xã', required: true, },
  cb_address: { title: "Địa chỉ cụ thể", placeholder: 'Nhập', required: true, },
  city_id: { title: "Tỉnh/thành phố", placeholder: 'Chọn tỉnh/thành phố', titleSelect: "Chọn tỉnh thành phố của bạn", required: true, },
  district_id: { title: "Quận/huyện", placeholder: 'Chọn quận/huyện', required: true, },
  ward_id: { title: "Phường/xã", placeholder: 'Chọn phường/xã', required: true, },
  address: { title: "Địa chỉ cụ thể", placeholder: 'Nhập', required: true, },
  images: { title: "Ảnh xác minh khách hàng (CMND/CCCD)", placeholder: 'Chọn', required: true, },
  country: { title: "Quốc tịch", placeholder: 'Chọn', titleSelect: "Chọn Quốc tịch của bạn", required: true, },
  // will_pay: { title: "Số tiền dự kiến thanh toán", placeholder: 'Nhập    ', required: true, keyboardType: 'number-pad' },
}
/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
export default function CampaignAddCustomer({ campaign_sale, building, category, total }: any) {
  const [update, setUpdate] = useState<any>({})
  // Log.d1('update', update)
  const scrollRef = useRef<ScrollView>(null)
  const [address, setAddress] = useState<any>({
    province_id: null,
    district_id: null,
    province_id_cmt: null,
    district_id_cmt: null,
    country: null
  })
  const Cities = useListCitiesStatic()
  const Districts = useListDistricts(address.province_id)
  const Ward = useListWard(address.district_id)
  const CitiesCmt = useListCitiesStatic()
  const DistrictsCmt = useListDistricts(address.province_id_cmt)
  const WardCmt = useListWard(address.district_id_cmt)
  const { keyboardShown, keyboardHeight, coordinates } = useKeyboard()
  const refCustomerSelect = useRef<any>()
  const [product, setProduct] = useState({
    category_id: null,
    campaign_sale_id: null,
    building_id: null,
    customer_id: null,
    source_id: null
  })
  // Log.d('product', product)
  const { set, get, getAll, clear, clearMulti, clearAll, getName, Ref, setAll, handleFc } = useHookForm()
  /*********
   * 
   * 
   * 
   * 
   * 
   */
  async function submit() {
    try {
      const body: any = {
        full_name: get('full_name'),
        phone: get('phone'),
        city_id: get('city_id', 'value'),
        district_id: get('district_id', 'value'),
        ward_id: get('ward_id', 'value'),
        sex: get('sex', 'id'),
        birthday: DatePost(get('birthday')),
        email: get('email'),
        cmt_full_name: get('cmt_full_name'),
        cmt_number: get('cmt_number'),
        cmt_date: DatePost(get('cmt_date')),
        cmt_address: get('cmt_address'),
        cb_city_id: get('cb_city_id', 'value'),
        cb_district_id: get('cb_district_id', 'value'),
        cb_ward_id: get('cb_ward_id', 'value'),
        cb_address: get('cb_address'),
        address: get('address'),
        country: get('country', 'id'),
        images: get('images', 'json'),
        // will_pay: get('will_pay'),
        cmt_img_before: get('images', 'before'),
        cmt_img_after: get('images', 'after')
      }

      Log.d1('getAll', body)
      // return
      let check = ValidateObject(body,
        {
          category_id: ['empty'],
          building_id: ['empty',],
          campaign_sale_id: ['empty'],
          phone: [body?.country == "nuoc_ngoai" ? 'phoneOther' : 'phone'],
          email: [body?.email ? "email" : 'none'],
          city_id: ['empty'],
          district_id: ['empty'],
          ward_id: ['empty'],
          sex: ['empty'],
          birthday: ['empty'],
          cmt_full_name: ['empty'],
          cmt_number: ['empty'],
          cmt_date: ['empty'],
          cmt_address: ['empty'],
          cb_city_id: ['empty'],
          cb_district_id: ['empty'],
          cb_ward_id: ['empty'],
          cb_address: ['empty'],
          address: ['empty'],
          country: ['empty'],
          images: ['empty'],
          cmt_img_before: ['empty'],//
          cmt_img_after: ['empty'],//
          // will_pay: ['empty'],
        })
      Log.d1('check', check)
      if (!check) return
      LoadingApp.show()
      const res = await CustomerApi.updateCustomer({ ...body, id: product.customer_id })
      Log.e('updateCustomer', res)
      if (res.status) {
        const { item } = res.data
        const images = decodeJson(item.images)
        body.cmt_img_after = images?.cmt_img_before
        body.cmt_img_before = images?.cmt_img_after
        delete body.images
        //
        body.category_id = product.category_id
        body.building_id = product.building_id
        body.campaign_sale_id = product.campaign_sale_id
        body.customer_id = product.customer_id
        body.source_id = product.source_id
        body.wish = 'wish'
        body.note = 'note'
        navigate('ScreenCampaignPayment', { body, total })
      }
      else ToastAppError(res?.mess)
      LoadingApp.hide()
    } catch (error) {
    }
  }


  async function asyncUpdate() {
    const {
      phone,
      birthday,
      email,
      cmt_full_name,
      cmt_number,
      cmt_date,
      cmt_address,
      cb_district_id,
      cb_ward_id,
      cb_address,
      address,

      images,
      cmt_img_before,
      cmt_img_after,
    } = update
    setAll({
      cmt_full_name, phone, cmt_number,
      cmt_address, email, address, cb_address,
    })
    // formRef.current['cb_district_id']?.setValue(cb_district_id)
    // formRef.current['cb_district_id']?.setValue(cb_district_id)

    let country = COUNTY_LIST.find(i => i.id == update?.country)
    if (country) setAll({ country })
    let sex = GENDER_LIST.find(i => i.id == update?.sex)
    if (sex) setAll({ sex })
    //
    let city_id = Cities.data.find(i => i['value'] == update?.city_id)
    if (city_id) setAll({ city_id })
    let cb_city_id = Cities.data.find(i => i['value'] == update?.cb_city_id)
    if (cb_city_id) setAll({ cb_city_id })
    //
    if (update?.district_id) {
      const district_id_res = await CustomerApi.getDetailDistricts({ id: update?.district_id })
      if (district_id_res.status) {
        setAll({ district_id: district_id_res.data })
      }
    }
    if (update?.cb_district_id) {
      const cb_district_id_res = await CustomerApi.getDetailDistricts({ id: update?.cb_district_id })
      if (cb_district_id_res.status) {
        setAll({ cb_district_id: cb_district_id_res.data })
      }
    }
    //
    if (update?.ward_id) {
      const ward_id_res = await CustomerApi.getDetailWard({ id: update?.ward_id })
      if (ward_id_res.status) {
        setAll({ ward_id: ward_id_res.data })
      }
    }
    if (update?.cb_ward_id) {
      const cb_ward_id_res = await CustomerApi.getDetailWard({ id: update?.cb_ward_id })
      if (cb_ward_id_res.status) {
        setAll({ cb_ward_id: cb_ward_id_res.data })
      }
    }
    if (isObject(update?.images)) {
      const { cmt_img_after, cmt_img_before } = update?.images
      Log.e('update?.imagesupdate?.imagesupdate?.images', { cmt_img_after, cmt_img_before })
      if (cmt_img_after) set('images', { uri: convertHttpToHttps(cmt_img_after) }, 'after')
      if (cmt_img_before) set('images', { uri: convertHttpToHttps(cmt_img_before) }, 'before')
    }
    if (update?.birthday && update?.birthday != "0000-00-00 00:00:00") {
      Log.e('birthday', convertDateMoment(update?.birthday).format())
      set('birthday', convertDateMoment(update?.birthday).format())
    }
    if (update?.cmt_date && update?.cmt_date != "0000-00-00 00:00:00") {
      Log.e('cmt_date', convertDateMoment(update?.cmt_date).format())
      set('cmt_date', convertDateMoment(update?.cmt_date).format())
    }



  }
  function onCategory(category_id: any) {
    setProduct(p => ({ ...p, category_id, campaign_sale_id: null, building_id: null }))
    clearMulti(['building_id', 'campaign_sale_id'])

    handleFc('building_id', 'updateParamsRef', { category_id })
    handleFc('campaign_sale_id', 'updateParamsRef', { category_id })
    handleFc('building_id', 'onRefresh')
    handleFc('campaign_sale_id', 'onRefresh')

  }
  function onBuilding(building_id: any) {
    setProduct(p => ({ ...p, building_id }))
  }
  function onCampaign(campaign_sale_id: any) {
    setProduct(p => ({ ...p, campaign_sale_id }))
  }
  function onCustomer(data: any) {
    Log.d1('data', data)
    setUpdate(data); setProduct(p => ({ ...p, customer_id: data.id, source_id: data?.source_id }))
  }
  async function onCities(data: any) {
    await setAddress((prev: any) => ({ ...prev, province_id: data?.value }))
    await Districts.updateParamInit({ province_id: data?.value })
    await Districts.onRefresh()
    await clearMulti(['district_id', 'ward_id'])
    await setAddress({ province_id: data?.value })
  }
  async function onDistricts(data: any) {
    setAddress((prev: any) => ({ ...prev, district_id: data?.value }))
    Ward.updateParamInit({ district_id: data?.value })
    Ward.onRefresh()
    await clear('ward_id')
  }
  async function onCitiesCmt(data: any) {
    await setAddress((prev: any) => ({ ...prev, province_id: data?.value }))
    await DistrictsCmt.updateParamInit({ province_id: data?.value })
    await DistrictsCmt.onRefresh()
    await clearMulti(['cb_district_id', 'cb_ward_id'])
    await setAddress({ province_id: data?.value })
  }
  async function onDistrictsCmt(data: any) {
    setAddress((prev: any) => ({ ...prev, district_id: data?.value }))
    WardCmt.updateParamInit({ district_id: data?.value })
    WardCmt.onRefresh()
    await clear('cb_ward_id')
  }
  function openCustomer() { refCustomerSelect.current?.open() }
  function initProps() {
    if (campaign_sale && building && category) {
      setProduct(p => ({ ...p, campaign_sale_id: campaign_sale?.id, category_id: category?.id, building_id: building?.id }))
      setAll({
        category_id: category,
        building_id: building,
        campaign_sale_id: campaign_sale
      })
    }
  }
  useEffect(() => { initProps() }, [])
  useEffect(() => {
    asyncUpdate()
  }, [update])

  return (
    <Block  >
      <ScrollView ref={scrollRef}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: keyboardShown ? keyboardHeight * 2 : 80,
          paddingHorizontal: 20
        }}>
        <InputSelectMore type="category"
          hook={useListCategory}
          onSelected={onCategory}
          ref={ref => Ref('category_id', ref)}
          {...Rest["category_id"]}
        />
        <InputSelectMore
          keyString="cb_title"
          ref={ref => Ref('building_id', ref)}
          type="building"
          hook={useListBuildingProject}
          onSelected={onBuilding}
          {...Rest["building_id"]}
        />
        <InputSelectMore
          keyString="title"
          ref={ref => Ref('campaign_sale_id', ref)}
          type="campaign"
          hook={useListCampaignProject}
          onSelected={onCampaign}
          {...Rest["campaign_sale_id"]}
        />
        <Block padV10>
          <TextApp bold primary lang='chon_khach_hang' />
        </Block>
        <Touch onPress={openCustomer} row centerBetween minH={40} borderW1 padH10 borderR5 borderC="gray">
          <TextApp bold primary>{update?.full_name ?? AppLang('chon')}</TextApp>
          <IconC name="chevron-forward-outline" />
        </Touch>
        <InputText ref={ref => Ref('cmt_full_name', ref)} {...Rest["cmt_full_name"]} />
        <InputText valueInit={update?.phone} type="phone" ref={ref => Ref('phone', ref)}{...Rest["phone"]} />
        <InputSelect onSelected={(e) => setAddress((i: any) => ({ ...i, country: e?.id ?? null }))} data={COUNTY_LIST} keyString="label"  {...Rest["country"]} ref={ref => Ref('country', ref)} />
        <InputSelect data={GENDER_LIST} keyString="label"  {...Rest["sex"]} ref={ref => Ref('sex', ref)} />
        <InputDate   {...Rest["birthday"]} ref={ref => Ref('birthday', ref)} />
        <InputText ref={ref => Ref('email', ref)} {...Rest["email"]} />
        <InputText ref={ref => Ref('cmt_number', ref)} {...Rest["cmt_number"]} />
        <InputDate ref={ref => Ref('cmt_date', ref)} {...Rest["cmt_date"]} />
        <InputText ref={ref => Ref('cmt_address', ref)} {...Rest["cmt_address"]} />
        <Title title="Địa chỉ liên hệ: " />
        <Block h={address.country == "nuoc_ngoai" ? 1 : undefined} overHidden>
          <InputSelect
            data={Cities.data}
            keyString="text"
            ref={ref => Ref('city_id', ref)}
            onSelected={onCities}
            {...Rest["city_id"]}
          />
          <InputSelect
            data={Districts.data}
            keyString="text"
            ref={ref => Ref('district_id', ref)}
            onSelected={onDistricts}
            {...Rest["district_id"]}
          />
          <InputSelect data={Ward.data} keyString="text" {...Rest["ward_id"]} ref={ref => Ref('ward_id', ref)} />
        </Block>
        <InputText   {...Rest["address"]} ref={ref => Ref('address', ref)} />
        <Title title="Địa chỉ thường trú: " />
        <Block h={address.country == "nuoc_ngoai" ? 1 : undefined} overHidden>
          <InputSelect data={CitiesCmt.data} keyString="text" {...Rest["cb_city_id"]} ref={ref => Ref('cb_city_id', ref)}
            onSelected={onCitiesCmt}
          />
          <InputSelect data={DistrictsCmt.data} keyString="text" {...Rest["cb_district_id"]} ref={ref => Ref('cb_district_id', ref)}
            onSelected={onDistrictsCmt} />
          <InputSelect data={WardCmt.data} keyString="text"{...Rest["cb_ward_id"]} ref={ref => Ref('cb_ward_id', ref)} />
        </Block>
        <InputText   {...Rest["cb_address"]} ref={ref => Ref('cb_address', ref)} />
        {/* <InputText   {...Rest["will_pay"]} ref={ref => Ref('will_pay', ref)} /> */}
        <InputCCCD {...Rest["images"]} ref={ref => Ref('images', ref)} />
        <ButtonApp title={AppLang('cap_nhat')} onPress={submit} marginOption={{ top: 30 }} />
        <ButtonApp title={"Bỏ qua"} onPress={goBack} background="transparent" color='gray' />
      </ScrollView>
      <ScrollTo scrollRef={scrollRef} />
      <ModalSelectCustomer ref={refCustomerSelect} onSelected={onCustomer} />
    </Block >
  )
}

const ScrollTo = ({ scrollRef }: any) =>
  <Block positionOption={{ right: 5, bottom: Dimensions.get('screen').height * 0.2 }} >
    <Touch onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} bg={AppColor.primary} borderCircle padV={3} >
      <IconApp name="arrow-up-outline" color={'#fff'} size={20} />
    </Touch>
    <Touch marT={10} onPress={() => scrollRef.current?.scrollToEnd()} bg={AppColor.primary} borderCircle padV={3} >
      <IconApp name="arrow-down-outline" color={'#fff'} size={20} />
    </Touch>
  </Block>


