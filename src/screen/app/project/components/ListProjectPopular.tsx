import { Animated, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Block, IconC, Touch } from '@mylib/UIKit'
import * as Animatable from 'react-native-animatable';
import { ListEmpty } from '@components/ListEmpty';
import { TextApp } from '@components';
import { screen_width, stylesApp } from '@components/index';
import { AppColor } from '@assets/colors';
import { navigate } from '@navigation';
import { DefineItem, MappedItem } from '@utils/type/core';
import { AppType } from '@utils/type';
import { AppImage } from '@assets/image';
import { uriImg } from '@utils/index';
import { convertId, TINH_TRANG_DU_AN } from '@service/constant/constant';
import { AppLang } from '@assets/langs';
import { userListProjectPop } from '@service/hook';
import { isEmpty } from 'underscore';


const itemWidth = (screen_width / 3) * 2
const itemHeight = itemWidth
export default function ListProjectPopular() {
    const scrollX = useRef(new Animated.Value(0)).current
    const { data } = userListProjectPop<any[]>()
    return (
        <>
            <Block row centerH padV5>
                <TextApp style={{ fontWeight: '700' }}>{AppLang('du_an_noi_bat')}</TextApp>
            </Block>
            <FlatList
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    },
                )}
                snapToInterval={itemWidth}
                // snapToStart
                // snapToOffsets={[3]}
                // snapToEnd={false}
                style={{ flexGrow: 0 }}
                contentContainerStyle={{ paddingVertical: 5 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_item, index) => `${index}`}
                contentOffset={{ x: 0, y: 0 }}
                renderItem={({ item, index }: any) => (
                    <Animatable.View
                        key={index}
                        animation="fadeInRight"
                        delay={index < 10 ? index * 80 : 1}
                        useNativeDriver>
                        <ItemListProjectPopular
                            item={item}
                            index={index}
                            scrollX={scrollX}
                            onPress={() => navigate('ScreenProjectDetail', { id: item?.id })}
                        />
                    </Animatable.View>
                )}

                ListEmptyComponent={<ListEmpty />}
            />
            <Block row centerH padV10>
                <TextApp style={{ fontWeight: '700' }}>{AppLang('tat_ca_du_an')}</TextApp>
            </Block>
        </>
    )
}


function ItemListProjectPopular({ item, index, scrollX, onPress }: DefineItem<AppType.ItemListProjectPopular>) {
    const scale = scrollX.interpolate({
        inputRange: [
            -itemWidth + index * itemWidth,
            index * itemWidth,
            itemWidth + index * itemWidth,
        ],
        outputRange: [0.9, 1, 0.4],
    })
    const opacity = scrollX.interpolate({
        inputRange: [
            -itemWidth + index * itemWidth,
            index * itemWidth,
            itemWidth + index * itemWidth,
        ],
        outputRange: [0.6, 1, 0.8],
    })
    const total = Number(item?.total_product) > 0 ? item?.total_product : null
    const status = convertId(TINH_TRANG_DU_AN)[item?.stage]
    const price = item?.price_from && Number(item?.price_from) > 0 ? `Từ ${item?.price_from} Tỉ` : "Đang cập nhật"
    const isLike = true
    return (
        <Touch onPress={onPress}>
            <Animated.View style={[styles.container, { opacity }, { transform: [{ scale, },] }]}>
                <Image defaultSource={AppImage('logo_bg1')} source={uriImg(item?.image, AppImage('logo_bg1'))} style={{ width: '100%', height: '65%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                <Block flex1 marL10 padV10>
                    <Block flex1 >
                        <TextApp bold>{item?.cb_title}</TextApp>
                        <Block row alignCenter marT5>
                            <TextApp>
                                <TextApp bold color={AppColor('txt_origin')}>{'$ '}</TextApp>
                                {price}
                            </TextApp>
                            <Block hidden={total == null} row marL10 marT5>
                                <IconC size={18} name="podium-outline" color='gray' />
                                <TextApp>{' '}{total}</TextApp>
                            </Block>
                        </Block>
                    </Block>
                    <TextApp size12 gray>{item?.address}</TextApp>
                </Block>
                <Block hidden={isEmpty(status)} pad5 styleBox={{
                    position: 'absolute', left: 2, top: '55%',
                    zIndex: 99, backgroundColor: status?.color, borderRadius: 100
                }}>
                    <TextApp color='#fff' size12>{status?.name}</TextApp>
                </Block>
                {isLike && <IconC name="heart" style={{ position: 'absolute', left: 2, top: 2 }} color='red' />}
            </Animated.View>
        </Touch>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        // overflow: 'hidden',
        width: itemWidth,
        height: itemHeight,
        borderWidthTop: 1,
        borderColor: '#eee',
        ...stylesApp.shawDow
        // marginRight: 10
    }
})
