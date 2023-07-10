import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Block, IconC, ListData, ListMap, Touch, TouchScale } from '@mylib'
import ScreenApp from '@components/layout/ScreenApp'
import { TextApp } from '@components/text'
import { screen_height, screen_width } from '@components/index'
import { Log } from '@utils/Log'
import { TableAnimate } from './TableAnimate'
import { DATA_NOTE, formatFloorCan, formatTable, MAU_SAN_PHAM, } from '../table'
import { useResize } from '../table/useResize';
import { navigate } from '@navigation/rootNavigation'
import { useListApartmentBuilding, useListProductBuilding, useTimeCount } from '@service/hook'
import { MappedItem } from '@utils/type/core';
import { getAllFloors, getAllCans } from '../table'
import { includeArray, randomColor } from '@utils/array'
import { AppLang } from '@assets/langs';
import { AppColor } from '@assets/colors';


const AnimatedTable2 = new TableAnimate(screen_height * 0.1 * 0.6)


// Log.d1('data', includeArray(data, ['floor', 'id', 'apartment_number']))
// Log.d('Products', Apartments.data)
export default function ScreenApartmentProject({ route }: any) {
  const { id, building_id, category_id, cart_id } = route.params
  const item = route.params?.item
  const { add, sub, width, scale } = useResize()
  const Apartments = useListApartmentBuilding<any[]>(id)
  const Products = useListProductBuilding<any[]>({ building_id, })//category_id, cart_id 
  const CANS = getAllCans(Apartments.data)
  const FLOORS = getAllFloors(Apartments.data)
  // Log.d('CANS', CANS)
  // Log.d('CANS', CANS.length)
  // Log.d('FLOORS', FLOORS)
  return (
    <ScreenApp back
      title={item?.cb_title + (__DEV__ ? ` (${Products.data.length})` : '')}
      renderRight={<BottomZoom add={add} sub={sub} />}
    >
      <Block flex1 bgW>
        <Header />
        {/* <AnimatedTable2.AnimateHeaderY>
          <ScrollView horizontal contentContainerStyle={{ width: 1000, minHeight: 50 }}>
            <Block row bg={MAU_SAN_PHAM.can} w={1000} minH={50}>
              <ListData data={formatFloorCan(CANS, 0)} renderItem={ItemApartment} />
            </Block>
          </ScrollView>
        </AnimatedTable2.AnimateHeaderY> */}
        <ScrollView
          onScroll={AnimatedTable2.onScrollY}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={undefined} />
          }
          scrollEventThrottle={16}
          style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 60 }}>
          {/* <ItemBuilding item={{ title: "Toa A", id: 123 }} /> */}

          {(!Apartments.loading || !Products.loading) &&
            <ListTable
              building_id={building_id}
              category_id={category_id}
              data={Products.data}
              CANS={CANS}
              FLOORS={FLOORS}
            />
          }
          {Apartments.data.length == 0 && !Apartments.loading &&
            <Block mid widthScreen h={250}>
              <TextApp>{AppLang('toa_nha_trong')}</TextApp>
            </Block>
          }
          {Apartments.loading &&
            <Block mid widthScreen h={250}>
              <ActivityIndicator />
            </Block>
          }
        </ScrollView>
      </Block>
    </ScreenApp>
  )
}

const ListTable = React.memo(({ data = [], CANS = [], FLOORS = [], building_id, category_id }: any) => {
  const { width, height_animate } = useResize()
  const AnimatedTable = new TableAnimate(width)
  // Log.d('123', { building_id, CANS, FLOORS })
  if (CANS.length == 0) return null
  return (
    <Block row >
      <AnimatedTable.AnimateHeader>
        <ListData data={formatFloorCan(FLOORS, 1)} renderItem={ItemApartment} />
      </AnimatedTable.AnimateHeader>
      <ScrollView
        onScroll={AnimatedTable.onScroll}
        horizontal
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 5, paddingLeft: AnimatedTable.headerHeight, paddingRight: 100 }}>
        <Animated.View style={{
          height: height_animate,
          width: '100%',
          backgroundColor: MAU_SAN_PHAM.can,
          position: 'absolute',
          left: -100,
          borderBottomWidth: 1,
          borderColor: 'gray'
        }}
        />

        <Block   >
          <FlatList
            ListHeaderComponent={
              <Block row bg={MAU_SAN_PHAM.can}>
                <ListData data={formatFloorCan(CANS, 0)} renderItem={ItemApartment} />
              </Block>
            }
            numColumns={CANS.length}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 5, }}
            showsHorizontalScrollIndicator={false}
            data={formatTable(CANS, FLOORS, data)}
            keyExtractor={(i, j) => j.toString()}
            renderItem={({ item, index }) =>
              <ItemApartment
                item={item}
                index={index}
                onPress={() => item.id && navigate('ScreenApartmentDetail', { id: item.id, building_id, category_id })}
              />
            }
          // stickyHeaderIndices={[0]}
          />
        </Block>
      </ScrollView>
    </Block>
  )
})
type item = {
  item:
  {
    name: string,
    info?: string,
    status: 1 | 2 | 3 | 4,
    id: number,
    type: number,
    color: string
    background: string
  },
  index: number
  onPress?: () => void
}
const ItemApartment = (({ item: { background, color, info, type, name }, index, onPress }: item) => {
  const { fontSize, width_animate, height_animate } = useResize()

  return (
    <TouchScale onPress={onPress}  >
      <Animated.View style={{
        width: width_animate,
        height: height_animate,
        backgroundColor: background,
        borderWidth: 0.5,
        borderColor: 'gray', alignItems: 'center',
        justifyContent: 'center',
        margin: 0.5,
      }}>
        {type == 2 && info && <BadgeApart time={Math.floor(Math.random() * 100) + 1} />}
        {type != 2 &&
          <Animated.Text
            style={{
              color,
              fontSize: fontSize,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {name}
          </Animated.Text>
        }
        {type == 2 &&
          <Block mid  >
            <Animated.Text
              style={{
                color,
                fontSize: fontSize,
                fontWeight: '300',
                textAlign: 'center',
              }}>
              {info == null ? '-' : name}
            </Animated.Text>
            <Animated.Text
              style={{
                color,
                fontSize: fontSize,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {info}
            </Animated.Text>
          </Block>
        }

      </Animated.View>

    </TouchScale>
  )
})

const BadgeApart = React.memo(({ time }: any) => {
  const { s, t } = useTimeCount(time)
  const { height_animate } = useResize()
  return (
    <Block borderCircle pad={2}
      background={s ? ['green', 'blue'] : 'red'}
      mid>
      <TextApp size={10} style={{ fontWeight: '800' }} color={'white'}>{t}</TextApp>
    </Block>
  )
})
const Header = () => {
  return (
    <Block >
      <ScrollView horizontal contentContainerStyle={{}}>
        <Block white row w={screen_width} pad10 centerBetween >
          <ListData
            style={{ flex: 1 }}
            data={DATA_NOTE}
            renderItem={({ item }) => (
              <Block row alignCenter  >
                <Block shadowOption={{ color: '#eee', elevation: 10, opacity: 1 }}
                  square={20} marR5 background={item?.color} borderW1 borderC={['#ddd']} />
                <TextApp>{item?.name}</TextApp>
              </Block>
            )}
          />
        </Block>
      </ScrollView>
      <Block h={1} background={'#ddd'} />
    </Block>
  )
}
const BottomZoom = ({ add, sub }: any) => {
  return (
    <Block row positionOption={{ right: 20, }} zIndex={99} borderR5>
      <Touch onPress={add} mid ><IconC name="add" color={'white'} /></Touch>
      <Touch onPress={sub} mid marL10><IconC name="remove-outline" color={'white'} /></Touch>
    </Block>
  )
}
let apartmentProps = ["id", "code", "cdt_code", "company_id", "p_status", "type", "status", "floor", "location", "apartment_number", "lot_number", "road", "bedroom", "toilet", "direction", "balcony_direction", "view", "corner_unit", "dt_thong_thuy", "dt_tim_tuong", "dt_san_vuon", "gia_thong_thuy", "gia_tim_tuong", "gia_san", "gia_tran", "gia_niem_yet", "gi_chu_niem_yet", "gia_ban_chua_vat", "don_gia_co_vat", "don_gia_chua_vat", "thue_vat", "maintain_price", "stage", "loai_dat_cho", "total", "lock_member", "open_sale", "note", "building_id", "category_id", "cart_id", "updated_at", "created_at", "deleted_at"] as const
type ApartmentProps = MappedItem<typeof apartmentProps>