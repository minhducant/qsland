import React from 'react'
import { Block, Touch } from '@mylib'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { FlatList, ScrollView, StyleSheet } from 'react-native'

import { navigate } from '@navigation/rootNavigation'
import ButtonApp from '@components/ButtonApp'
import { TextApp } from '@components/text'
import { stylesApp } from '@components/index'
import { AppColor } from '@assets/colors'

export default function ScreenLookDetail() {
    return (
        <ScreenApp back title={AppLang('Chi tiet yeu cau')}>
            <Block flex1 bgW>
                <ScrollView contentContainerStyle={{ paddingBottom: 400 }}>
                    <Block mar10>
                        <TextApp toUpperCase>{'mo ta'}</TextApp>
                        <TextApp  >{'Chien dich gom cho phuong don'}</TextApp>
                    </Block>
                    <Block pad10 >
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="chi_tiet" toUpperCase size16></TextApp>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="SO cho toi da"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{'2138283726'}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="so tien yeu cai"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{'2138283726'}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="thoi gian bat dau"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{'2138283726'}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="thio gian ket thuc"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{'2138283726'}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="du an"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{'2138283726'}</TextApp>
                            </Block>
                        </Block>
                        <Block row centerBetween pad10>
                            <TextApp flex1 lang="toàÏ"></TextApp>
                            <Block flex1 borderBW={1} borderC="#ddd">
                                <TextApp bold primary>{'2138283726'}</TextApp>
                            </Block>
                        </Block>
                    </Block>
                    <Block mid pad10 marT={50}>
                        <ButtonApp onPress={() => navigate('ScreenCampaignRegister')} style={{ width: '100%', height: 45 }} title={AppLang('BỔ SUNG KHÁCH HÀNG YÊU CẦU HỢP ĐỒNG')} />
                    </Block>
                </ScrollView>
            </Block>
        </ScreenApp>
    )
}  