import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { decode } from 'html-entities'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { screen_width, TextApp } from '@components'
import { useDetailNew } from '@service/hook'
import { NewDetail } from '@utils/type'
import { WebDisplay } from '@mylib/UIKit/Common/HtmlRender';



export default function ScreenNewDetail({ route }: any) {
  //category
  const { id } = route.params
  const { data, loading, onRefresh } = useDetailNew<NewDetail>(id)
  // console.log(Object.keys(data ?? {}));

  return (
    <ScreenApp back title={data?.title ?? AppLang('tin_tuc')}>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        contentContainerStyle={{}}>
        <WebDisplay
          html={data?.desc_detail}
        />
      </ScrollView>
    </ScreenApp>
  )
}
