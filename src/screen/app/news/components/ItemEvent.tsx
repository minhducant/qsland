import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable'
import { Block, IconC, ImageC, Touch } from '@mylib';
import { stylesApp, TextApp } from '@components';
import { DefineItem, MappedItem } from '@utils/type/core';
import { AppImage } from '@assets/image';
import { uriImg } from '@utils/index';
import { AppColor } from '@assets/colors';
import { isEmpty } from 'underscore';

export default function ItemEvent({ item, onPress, index }: DefineItem<_Item>) {

    return (
        <Touch onPress={onPress} row styleBox={styles.container}>
            <Image defaultSource={AppImage('logo_bg1')} source={uriImg(item?.avatar, AppImage('logo_bg1'))} style={{ width: 100, height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
            <Block flex1 marL10 padV10>
                <Block flex1 >
                    <TextApp bold>{item?.title}</TextApp>
                    <Block row alignCenter marT5>
                        <Block row  >
                            <TextApp>
                                {item?.address}
                            </TextApp>
                        </Block>

                    </Block>
                </Block>
                <TextApp size12 >{item?.created_at}</TextApp>
            </Block>
        </Touch>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopWidth: 0.5,
        borderColor: '#eee',
        ...stylesApp.shawDow
    }
})
let _keyItem = ["id", "avatar", "hashtag", "priority_level", "comment_type", "vote_option", "status", "type", "title", "company_ids", "exchange_ids", "desc_short", "desc_detail", "created_at", "updated_at", "deleted_at", "category_ids", "honor_units", "honor_exchange_id", "honor_spending", "allow_register", "allow_member", "address", "units", "register_time_start", "register_time_end", "checkin_time_start", "checkin_time_end", "event_time_start", "event_time_end"] as const;
type _Item = MappedItem<typeof _keyItem>


