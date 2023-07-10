import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable'
import { AvatarC, Block, IconC, ImageC, Touch } from '@mylib';
import { screen_width, stylesApp, TextApp } from '@components';
import { DefineItem, MappedItem } from '@utils/type/core';
import { AppImage } from '@assets/image';
import { uriImg } from '@utils/index';
import { AppColor } from '@assets/colors';
import { isEmpty } from 'underscore';
import ButtonApp from '@components/ButtonApp';
import { AppLang } from '@assets/langs';

export default function ItemEventA({ item, onPress, index }: DefineItem<_Item>) {

    return (
        <Touch onPress={onPress} styleBox={styles.container}>
            <Image defaultSource={AppImage('logo_bg1')} source={uriImg(item?.avatar, AppImage('logo_bg1'))} style={styles.image} />
            <Block flex1 marH10 padV10>
                <Block row centerBetween>
                    <TextApp toUpperCase>{'Thứ 7 ngày 12/12 lúc 12:00'}</TextApp>
                    <TextApp red>{'Còn 12 ngày'}</TextApp>
                </Block>
                <Block flex1 padT10>
                    <TextApp bold size18>{item?.title}</TextApp>
                    <Block row alignCenter marT5>
                        <Block row  >
                            <TextApp>
                                {item?.address}
                            </TextApp>
                        </Block>

                    </Block>
                </Block>
                <Block row centerBetween>
                    <Block row alignCenter>
                        <AvatarC radius={16} />
                        <TextApp>{' +999'}</TextApp>
                    </Block>
                    <ButtonApp title={AppLang('dang_ky_ngay')} borderCircle />
                </Block>
            </Block>
        </Touch>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: screen_width * 0.5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopWidth: 0.5,
        overFlow: 'hidden',
        borderColor: '#eee',
        ...stylesApp.shawDow
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        height: screen_width * 0.35,
        resizeMode: 'contain',
        backgroundColor: 'gray'
    }
})
let _keyItem = ["id", "avatar", "hashtag", "priority_level", "comment_type", "vote_option", "status", "type", "title", "company_ids", "exchange_ids", "desc_short", "desc_detail", "created_at", "updated_at", "deleted_at", "category_ids", "honor_units", "honor_exchange_id", "honor_spending", "allow_register", "allow_member", "address", "units", "register_time_start", "register_time_end", "checkin_time_start", "checkin_time_end", "event_time_start", "event_time_end"] as const;
type _Item = MappedItem<typeof _keyItem>


