import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-animatable'
import { Block, IconC, ImageC, Touch } from '@mylib';
import { stylesApp, TextApp } from '@components';
import { DefineItem, MappedItem } from '@utils/type/core';
import { AppImage } from '@assets/image';
import { uriImg } from '@utils/index';
import { TINH_TRANG_DU_AN, convertId } from '@service/constant/constant';
import { AppColor } from '@assets/colors';
import { isEmpty } from 'underscore';

export default function ItemListProject({ item, onPress, index }: DefineItem<_Item>) {
    const total = Number(item?.total_product) > 0 ? item?.total_product : null
    const status = convertId(TINH_TRANG_DU_AN)[item?.stage]
    const price = item?.price_from && Number(item?.price_from) > 0 ? `Từ ${item?.price_from} Tỉ` : "Đang cập nhật"

    const isLike = false

    return (
        <Touch onPress={onPress} row styleBox={styles.container}>
            <Image defaultSource={AppImage('logo_bg1')} source={uriImg(item?.image, AppImage('logo_bg1'))} style={{ width: 100, height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
            <Block flex1 marL10 padV10>
                <Block flex1 >
                    <TextApp bold>{item?.cb_title}</TextApp>
                    <Block row alignCenter marT5>
                        <Block row  >
                            <TextApp>
                                <TextApp bold color={AppColor('txt_origin')}>{'$ '}</TextApp>
                                {price}
                            </TextApp>
                        </Block>

                        <Block hidden={total == null} row marL10>
                            <IconC size={18} name="podium-outline" color='gray' />
                            <TextApp>{' '}{total}</TextApp>
                        </Block>
                    </Block>
                </Block>
                <TextApp size12 gray>{item?.address}</TextApp>
            </Block>
            {isLike && <IconC size={18} name="heart" style={{ position: 'absolute', left: 2, top: 2 }} color='red' />}
            <Block background={status?.color} hidden={isEmpty(status)} pad5 styleBox={{ position: 'absolute', left: 2, bottom: 2, zIndex: 99, borderRadius: 100 }}>
                <TextApp color='#fff' size12>{status?.name}</TextApp>
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
let _keyItem = ["total_product", "id", "cb_id", "cb_status", "parent_id", "ward_id", "cb_code", "reference_code", "cb_title", "alias", "cb_description", "extra_ids", "updated_user_id", "investor_id", "ub_updated_time", "created_user_id", "ub_created_time", "cb_level", "last_sync_tvc", "type", "apartment_grid", "active_booking", "enable_list_price", "send_mail", "dxmb_project_id", "image", "images", "price_from", "price_to", "city_id", "district_id", "pj_description", "address", "stage", "hidden_cat", "order", "company_id", "staff_lock", "staff_assemble", "active_assemble", "total_progress", "type_project", "row_table_style", "lock", "assemble", "publication_time", "handover_documents", "created_at", "deleted_at", "updated_at", "name"] as const;
type _Item = MappedItem<typeof _keyItem>


//   building_id :73
//   apartment_id  :12784
//   type :1
//   month : 202306  
//   number_current : 999999