import { ActivityIndicator, Button, Dimensions, FlatList, Image, StatusBar, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Block, IconC, Touch } from '@mylib'
import { AppImage } from '@assets/image'
import ScreenApp from '@components/layout/ScreenApp'
import FastImage from 'react-native-fast-image'
import { AppLang } from '@assets/langs';
import { useNotifyApp } from '@service/store'
import { AppColor } from '@assets/colors'
import { ListEmpty } from '@components/ListEmpty'
import { screen_width, TextApp } from '@components/index'
import { Log } from '@utils'
import { getFcmToken } from '@navigation/Notification/getFcmToken';
import Clipboard from '@react-native-clipboard/clipboard'
import { ToastAppSuccess } from '@components/Toast';
import { TYPE_SENDER } from './api';






export default function ScreenNotifyApp() {
    const { data, loading, onLoadMore, onRefresh, loading_more } = useNotifyApp()
    return (
        <ScreenApp back title={AppLang('thong_bao')} renderRight={
            <Touch onPress={async () => {
                const token = await getFcmToken()
                Clipboard.setString(`${token}`)
                ToastAppSuccess(`[${token}]`, 'Đây là token thông báo của bạn')
            }} positionA styleBox={{ right: 10, top: 15 }}>
                <IconC name="information-circle-outline" color='#fff' />
            </Touch>

        } >
            <Block flex1 bgW>
                <FlatList
                    refreshing={loading}
                    onRefresh={onRefresh}
                    data={_data}
                    keyExtractor={(i, j) => `${j}`}
                    renderItem={({ item }) => <ItemNotify item={item} />}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    style={{ flex: 1 }}
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        <Block>
                            {loading_more && (
                                <ActivityIndicator size={30} color={AppColor('primary')} />
                            )}
                        </Block>
                    }
                    ListEmptyComponent={<ListEmpty onRefresh={onRefresh} />}
                />
            </Block>
        </ScreenApp>
    )
}
const height = Dimensions.get('screen').width * 0.2
const width = Dimensions.get('screen').width * 0.8
const formatNotify = (item: any) => {
    return {
        image: AppImage('logo_bg1'),
        title: 'Thông báo',
        description: 'Thông báo phân bổ',
        time: '12h05 02/02/23',
    }
}

const ItemNotify = ({ item }: any) => {
    const { image, title, description, time } = formatNotify(item)
    const background = item?.status == 1 ? AppColor('_notify_inactive') : AppColor('_notify_active')
    // Log.d('formatNotify(item)', formatNotify(item))
    const onPressItem = () => {
        switch (item?.type_sender) {
            case TYPE_SENDER.vipham:
                break;
            case TYPE_SENDER.customer:
                break;
            default:
                break;
        }
    }
    return (
        <Touch
            onPress={onPressItem}
            centerH
            row
            borderBW={0.8}
            borderC='#eee'
            onLongPress={() => __DEV__ && alert(JSON.stringify(item))}
            h={height}
            bg={background}
        >
            <Block w={width * 0.25} overH h100 mid  >
                <FastImage
                    style={{
                        width: width * 0.18,
                        height: width * 0.18,
                        borderRadius: 100,
                        borderWidth: 0.3,
                        borderColor: AppColor('primary')
                    }}
                    source={image}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </Block>
            <Block padH10 w={width} h={height} justifyCenter overH padV10>
                <Block flex1>
                    <TextApp size16 bold>{title}</TextApp>
                </Block>
                <Block row centerH >
                    <TextApp flex1 size12 numberOfLines={2}>
                        {description}
                    </TextApp>
                    <TextApp size12>
                        {time}
                    </TextApp>
                </Block>
            </Block>
        </Touch>
    )
}




let _data = [
    {
        "__v": 0,
        "_id": "648094e959ff3edc0aa21d71",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-06-07T14:32:09.616Z",
        "deleted_at": null,
        "from_by": 51283,
        "id_sender": 2130,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-06-07T14:32:09.616Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "647f020d6be28e2be21df48c",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-06-06T09:53:17.175Z",
        "deleted_at": null,
        "from_by": 39807,
        "id_sender": 2129,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-06-06T09:53:17.175Z",
        "user_id": 2,
    },
    {
        "_id": "647d47e91c2f5280640fc573",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "BẢNG TIN DỊCH VỤ 29/05/2023 – 04/06/2023",
        "created_at": "2023-06-05T02:26:49.756Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 12058,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-06-05T02:26:49.756Z",
        "user_id": 2,
    },
    {
        "_id": "64786110ff821f013d04ecb9",
        "action_desc": "[Chung cư Opal Boulevard]_A2-32.07 hóa đơn kỳ tháng 202306",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "Trạng thái: chờ thanh toán",
        "created_at": "2023-06-01T09:12:48.864Z",
        "deleted_at": null,
        "from_by": null,
        "id_sender": 445116,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 0,
        "updated_at": "2023-06-01T09:12:48.864Z",
        "user_id": 2,
    },
    {
        "_id": "64785e06b011d1420d071358",
        "action_desc": "[Chung cư Opal Boulevard]_A2-32.07 hóa đơn kỳ tháng 202306",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "Trạng thái: chờ thanh toán",
        "created_at": "2023-06-01T08:59:50.309Z",
        "deleted_at": null,
        "from_by": null,
        "id_sender": 446266,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 0,
        "updated_at": "2023-06-01T08:59:50.309Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "64771e1c75e50c5d888f77c7",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-31T10:14:52.524Z",
        "deleted_at": null,
        "from_by": 51356,
        "id_sender": 2128,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-31T10:14:52.524Z",
        "user_id": 2,
    },
    {
        "_id": "6476afb8533cc01565063fd0",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "THÔNG BÁO V/v: MỜI THAM DỰ CHƯƠNG TRÌNH NGÀY QUỐC TẾ THIẾU NHI TẠI CHUNG CƯ OPAL BOULEVARD",
        "created_at": "2023-05-31T02:23:52.956Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 12013,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-31T02:23:52.956Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "6476a63b75e50c5d888d5c9e",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-31T01:43:23.848Z",
        "deleted_at": null,
        "from_by": 8269,
        "id_sender": 2127,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-31T01:43:23.848Z",
        "user_id": 2,
    },
    {
        "_id": "6474096205e5bf9c7806a20d",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "BẢNG TIN DỊCH VỤ 22/05/2023 – 28/05/2023",
        "created_at": "2023-05-29T02:09:38.095Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 11984,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-29T02:09:38.095Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "647362568a9765a18d83a94f",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-28T14:16:54.100Z",
        "deleted_at": null,
        "from_by": 15091,
        "id_sender": 2126,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-28T14:16:54.100Z",
        "user_id": 2,
    },
    {
        "_id": "647076253d919afe9e0297d3",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "THÔNG BÁO TẠM NGƯNG CUNG CẤP ĐIỆN ĐỐI VỚI CÁC CĂN HỘ CHƯA THANH TOÁN PHÍ ĐIỆN CHO CÔNG TY ĐIỆN LỰC DĨ AN",
        "created_at": "2023-05-26T09:04:37.686Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 11959,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-26T09:04:37.686Z",
        "user_id": 2,
    },
    {
        "_id": "646f02992f1892692b0b8153",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "THÔNG BÁO V/V: NHẮC PHÍ LẦN 3 CÁC CĂN HỘ CHƯA THANH TOÁN PHÍ DỊCH VỤ QUẢN LÝ THÁNG 5",
        "created_at": "2023-05-25T06:39:21.792Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 11950,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-25T06:39:21.792Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "646b71d8c07797e3ab93504d",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-22T13:44:56.905Z",
        "deleted_at": null,
        "from_by": 51283,
        "id_sender": 2125,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-22T13:44:56.905Z",
        "user_id": 2,
    },
    {
        "_id": "646ae60d2d036ce4ca086493",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "BẢNG TIN DỊCH VỤ 15/05/2023 – 21/05/2023",
        "created_at": "2023-05-22T03:48:29.899Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 11923,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-22T03:48:29.899Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "64699c55c07797e3ab90c76d",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-21T04:21:41.149Z",
        "deleted_at": null,
        "from_by": 41169,
        "id_sender": 2124,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-21T04:21:41.149Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "64678abbc07797e3ab8f1aff",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-19T14:42:03.114Z",
        "deleted_at": null,
        "from_by": 8269,
        "id_sender": 2123,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-19T14:42:03.114Z",
        "user_id": 2,
    },
    {
        "_id": "646374a7a5da99be7607a7c2",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "THÔNG BÁO V/V: NHẮC PHÍ LẦN 2 CÁC CĂN HỘ CHƯA THANH TOÁN PHÍ DỊCH VỤ QUẢN LÝ THÁNG 5",
        "created_at": "2023-05-16T12:18:47.897Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 11898,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-16T12:18:47.897Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "646341d792db027e96a3a5a8",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-16T08:41:59.789Z",
        "deleted_at": null,
        "from_by": 40131,
        "id_sender": 2122,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-16T08:41:59.789Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "6462692592db027e96a24e84",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-15T17:17:25.211Z",
        "deleted_at": null,
        "from_by": 53936,
        "id_sender": 2121,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-15T17:17:25.211Z",
        "user_id": 2,
    },
    {
        "_id": "64618d729225dd1b420fcf03",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "BẢNG TIN DỊCH VỤ 04/05/2023 – 14/05/2023",
        "created_at": "2023-05-15T01:40:02.364Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 11875,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-15T01:40:02.364Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "64618a4592db027e969fb0ca",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-15T01:26:29.336Z",
        "deleted_at": null,
        "from_by": 51283,
        "id_sender": 2120,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-15T01:26:29.336Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "645c8b6324874117951edd9d",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-11T06:29:55.398Z",
        "deleted_at": null,
        "from_by": 53936,
        "id_sender": 2119,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-11T06:29:55.398Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "645b2ad9e81f171a801a5908",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-10T05:25:45.263Z",
        "deleted_at": null,
        "from_by": 51283,
        "id_sender": 2118,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-10T05:25:45.263Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "645af883e81f171a801965a5",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-10T01:50:59.868Z",
        "deleted_at": null,
        "from_by": 8269,
        "id_sender": 2117,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-10T01:50:59.868Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "645a80dde81f171a8018e8f7",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-09T17:20:29.619Z",
        "deleted_at": null,
        "from_by": 54793,
        "id_sender": 2116,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-09T17:20:29.619Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "6458af20902e715d3743be95",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-08T08:13:20.881Z",
        "deleted_at": null,
        "from_by": 58036,
        "id_sender": 2115,
        "new": 1,
        "status": 1,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-08T08:13:20.881Z",
        "user_id": 2,
    },
    {
        "_id": "64535794417982e8450abead",
        "action_desc": "[Chung cư Opal Boulevard]_A2-32.07 hóa đơn kỳ tháng 202305",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "Trạng thái: chờ thanh toán",
        "created_at": "2023-05-04T06:58:28.657Z",
        "deleted_at": null,
        "from_by": null,
        "id_sender": 434234,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 0,
        "updated_at": "2023-05-04T06:58:28.657Z",
        "user_id": 2,
    },
    {
        "_id": "6451b9119a276a87640995e1",
        "action_desc": "Thông báo",
        "apartment_id": null,
        "building_id": 72,
        "by": 0,
        "content": "BẢNG TIN DỊCH VỤ 24/04/2023 – 03/05/2023",
        "created_at": "2023-05-03T01:29:53.959Z",
        "deleted_at": null,
        "from_by": 11769,
        "id_sender": 11763,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 3,
        "updated_at": "2023-05-03T01:29:53.959Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "64511d02902e715d37362090",
        "action_desc": "đã đăng một bài post",
        "apartment_id": null,
        "building_id": 0,
        "by": 1,
        "content": "",
        "created_at": "2023-05-02T14:24:02.045Z",
        "deleted_at": null,
        "from_by": 39649,
        "id_sender": 2114,
        "new": 1,
        "status": 2,
        "type_request": -1,
        "type_sender": 4,
        "updated_at": "2023-05-02T14:24:02.045Z",
        "user_id": 2,
    },
    {
        "__v": 0,
        "_id": "6448e504902e715d372ffdee",
        "action_desc": "đang xử lý phiếu yêu cầu của bạn",
        "apartment_id": null,
        "building_id": 73,
        "by": 0,
        "content": "Trang thái yêu cầu đã được thay đổi",
        "created_at": "2023-04-26T08:47:00.003Z",
        "deleted_at": null,
        "from_by": 73,
        "id_sender": 275,
        "new": 1,
        "status": 2,
        "type_request": 7,
        "type_sender": 8,
        "updated_at": "2023-04-26T08:47:00.003Z",
        "user_id": 2,
    },
]
