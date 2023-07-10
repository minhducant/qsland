import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,

} from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Block, IconC, ListData, HtmlRender, Touch, TouchScale, ListColumn } from '@mylib'
import { decode } from 'html-entities'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { screen_width, TextApp } from '@components'
import { createArray, createArray2 } from '@utils/array'
import { Log } from '@utils/Log'
import { navigate } from '@navigation'
import { isArray, isEmpty, isString } from 'underscore'
import { useListBuildingProject, useListCampaignProject, useProjectDetail } from '@service/hook'
import { MappedItem, DefineItem } from '@utils/type/core';
import { AppImage } from '@assets/image'
import { uriImg } from '@utils/index'
import RenderHTML from 'react-native-render-html'
import { WebDisplay } from '@mylib/UIKit/Common/HtmlRender'
import { convertId, TINH_TRANG_DU_AN } from '@service/constant/constant'
const childrenWidth = screen_width - 20


export default function ScreenProjectDetail({ route }: any) {
  //category
  const { id } = route.params
  const [index, setIndex] = useState(0)
  const { data, onRefresh, loading, } = useProjectDetail<MappedItem<typeof _Detail>>(id)
  const ListCampaignProject = useListCampaignProject<any>(id)
  const ListBuildingProject = useListBuildingProject<any>(id)
  // Log.d1('images', data.images)
  const ListImage = useMemo(() => {
    let res = []
    if (data?.image) res.push(data.image)
    if (isArray(data?.images)) res.concat(data.images)
    return res
  }, [data])
  const status = convertId(TINH_TRANG_DU_AN)[data?.stage]
  return (
    <ScreenApp back title={AppLang('thong_tin_du_an')}>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={{}}>
        <Block alignCenter>
          <FlatList
            onScroll={e => {
              let _index = Math.floor(
                e.nativeEvent.contentOffset.x / childrenWidth,
              )
              if (index !== _index) setIndex(_index)
            }}
            horizontal
            data={ListImage}
            pagingEnabled
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToInterval={childrenWidth + 20}
            renderItem={({ item, index }) => (
              <Touch>
                {isString(item) && item.search('http') != -1 &&
                  <Image
                    defaultSource={AppImage('logo_bg1')}
                    source={uriImg(item)}
                    style={{
                      width: childrenWidth,
                      height: childrenWidth * 0.5,
                      resizeMode: 'cover',
                      backgroundColor: '#eee',
                      borderRadius: 10,
                      margin: 10,
                    }}
                  />}
                <Touch positionOption={{ left: 20, top: 20 }}>
                  <IconC name={'heart'} color={'red'} />
                </Touch>
              </Touch>
            )}
          />
          <Block positionOption={{ right: 20, top: 20 }} black borderR5 padH5>
            <TextApp white>
              {index + 1}/{ListImage.length}
            </TextApp>
          </Block>
          <Block hidden={isEmpty(status)} background={status?.color} positionOption={{ bottom: 0 }} borderR5 padH5>
            <TextApp white>{status?.name}</TextApp>
          </Block>
        </Block>
        <Block pad10 >
          <TextApp center bold size18  >{data?.cb_title}</TextApp>
        </Block>
        <Block h={2} background="#eee" />
        <Block pad10 hidden={ListBuildingProject.data.length == 0} >
          <TextApp primary bold size18 lang='bang_hang' toUpperCase></TextApp>
        </Block>
        <ListColumn
          numberColumn={2}
          data={ListBuildingProject.data}
          styleCell={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <ItemBuilding
              {...{ item, index }}
              onPress={() => navigate('ScreenApartmentProject',
                {
                  id: item.id, item,
                  building_id: item.id,
                  category_id: id
                })}
            />
          )}
        />
        <Block pad10 hidden={ListCampaignProject.data.length == 0} >
          <TextApp primary bold size18 lang='chien_dich' toUpperCase></TextApp>
        </Block>
        <ListColumn
          numberColumn={2}
          data={ListCampaignProject.data}
          styleCell={{ flex: 1 }}
          renderItem={({ item, index }) => (
            <ItemCampaign
              {...{ item, index }}
              onPress={() => navigate('ScreenListCampaign', { id: id })}
            />
          )}
        />
        <Block h={10} background="#eee" />
        <Block pad10>
          <WebDisplay
            html={(data?.cb_description)}
          />
        </Block>
      </ScrollView>
    </ScreenApp>
  )
}
/***
 *
 * components
 */
function ItemCampaign({ onPress, item, index }: DefineItem<MappedItem<typeof _ItemCamp>>) {
  return (
    <TouchScale
      {...{ onPress }}
      mar10
      pad10
      row
      alignCenter
      borderW1
      borderC={['#ddd']}
      borderR5
      white>
      <Block>
        <IconC name='grid-outline' color={['primary']} size={[28]} />
      </Block>
      <Block marL10>
        <TextApp bold>{item?.title}{__DEV__ ? `(${item.id})` : ''}</TextApp>
        {!isEmpty(item?.desc) && <TextApp>{item?.desc}</TextApp>}
      </Block>
    </TouchScale >
  )
}
export function ItemBuilding({ onPress, item }: DefineItem<MappedItem<typeof _bdc_props>>) {
  // console.log(Object.keys(item))
  return (
    <TouchScale
      {...{ onPress }}
      mar10
      pad10
      row
      alignCenter
      borderW1
      borderC={['#ddd']}
      borderR5
      white>
      <Block>
        <IconC name='business-outline' color={['primary']} size={[28]} />
      </Block>
      <Block marL10 flex1>
        <TextApp bold numberOfLines={1} flex1>{item?.cb_title}{__DEV__ ? `(${item?.id})` : ''}</TextApp>
        {!isEmpty(item?.cb_code) && <TextApp>{item?.cb_code}</TextApp>}
      </Block>
    </TouchScale >
  )
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
 */
let _ItemCamp = ["id", "title", "max", "time_start", "time_end", "category_id", "total", "company_id", "building_id", "deleted_at", "updated_at", "created_at", "desc", "status"] as const
let _Detail = ["id", "cb_id", "cb_status", "parent_id", "ward_id", "cb_code", "reference_code", "cb_title", "alias", "cb_description", "extra_ids", "updated_user_id", "investor_id", "ub_updated_time", "created_user_id", "ub_created_time", "cb_level", "last_sync_tvc", "type", "apartment_grid", "active_booking", "enable_list_price", "send_mail", "dxmb_project_id", "image", "images", "price_from", "price_to", "city_id", "district_id", "pj_description", "address", "stage", "hidden_cat", "order", "company_id", "staff_lock", "staff_assemble", "active_assemble", "total_progress", "type_project", "row_table_style", "lock", "assemble", "publication_time", "handover_documents", "created_at", "deleted_at", "updated_at"] as const
const _bdc_props = ["id", "cb_id", "cb_status", "parent_id", "ward_id", "cb_code", "reference_code", "cb_title", "alias", "cb_description", "extra_ids", "updated_user_id", "investor_id", "ub_updated_time", "created_user_id", "ub_created_time", "cb_level", "last_sync_tvc", "type", "apartment_grid", "active_booking", "enable_list_price", "send_mail", "dxmb_project_id", "image", "images", "price_from", "price_to", "city_id", "district_id", "pj_description", "address", "stage", "hidden_cat", "order", "company_id", "staff_lock", "staff_assemble", "active_assemble", "total_progress", "type_project", "row_table_style", "lock", "assemble", "publication_time", "handover_documents", "created_at", "deleted_at", "updated_at"] as const