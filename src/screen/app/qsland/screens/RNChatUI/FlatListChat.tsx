import { StyleSheet, Text, View, FlatList, ScrollView, ViewProps, TouchableOpacity } from 'react-native'
import React from 'react'
import { screen_width } from '@components/index';
import { Block } from '@mylib/UIKit';
import { useMessage } from './hook';
import { Log } from '@utils/Log';

export default function FlatListChat() {

    return (
        <ScrollView horizontal >
            <FlatList
                scrollEnabled={false}
                contentContainerStyle={{ padding: padding, width: screen_width }}
                data={LIST}
                keyExtractor={(i, j) => j.toString()}
                renderItem={({ item, index }) =>
                    <View>
                        <Message item={item} index={index} />
                        <Message item={item} index={index}
                            containerStyle={{ marginLeft: marginLeftChildren, marginTop: 10 }}
                            containerRight={{ maxWidth: right_width_children }}

                        />
                    </View>
                }
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </ScrollView>
    )
}

/*********** */

type MessageProps = {
    item: any, index: number, containerStyle?: ViewProps['style'], containerRight?: ViewProps['style']
}
function Message({ item, index, containerStyle, containerRight }: MessageProps) {
    const { setMessage } = useMessage()
    return (
        <View style={[message.container, containerStyle]}>
            <View style={message.containerLeft}>
                <View style={{ width: left_width, height: left_width, backgroundColor: 'blue', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', }}>{'A'}</Text>
                </View>
            </View>
            <View style={message.containerRight}>
                <View style={[message.containerRightMessage, containerRight]}>
                    <Text style={message.title}>{item?.title}</Text>
                    <Text style={message.text}>{item?.text}</Text>
                </View>
                <View style={[message.containerRightReply]}>
                    <View style={{
                        paddingVertical: 5,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Text style={{}}>{'Like'}</Text>
                        <Text onPress={() => setMessage(item)} style={{ marginLeft: 10 }}>{'Reply'}</Text>
                        <Text style={{ marginLeft: 10 }}>{'1 day'}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            paddingBottom: 5,
                            justifyContent: 'flex-start',
                        }}>
                        <Text style={{}}>{'Load more'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const padding = 10
const marginLeft = 10
const min_width = 100

const max_width = screen_width - padding * 2
const min_height = screen_width * 0.15
const left_width = screen_width * 0.1
const right_width = max_width - left_width - marginLeft
const right_width_children = right_width - left_width - marginLeft

const marginLeftChildren = left_width + marginLeft

const message = StyleSheet.create({
    container: {
        minWidth: min_width,
        maxWidth: max_width,
        backgroundColor: 'red',
        flexDirection: 'row'
    },
    containerLeft: {
        width: left_width,
        backgroundColor: 'gray'
    },
    containerRight: {
        marginLeft: marginLeft,
        maxWidth: right_width,
        backgroundColor: 'green',
    },
    containerRightMessage: {
        maxWidth: right_width,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
        overflow: 'hidden',
        alignItems: 'flex-start'
    },
    containerRightReply: {
        maxWidth: right_width,

        backgroundColor: '#D400FE',

    },
    title: { fontWeight: '500', fontSize: 18 },
    text: { fontWeight: '300', fontSize: 18 },
    avatar: {}
})
const LIST = [
    {
        id: 123,
        title: 'Hoàng Oanh',
        text: 'Thời tiết kinh khủng vch',
        children: [
            {
                id: 1232,
                title: 'Minh Khoi Pham',
                text: 'Bích Ngọc Nguyễn'
            }
        ]
    },
    {
        id: 123,
        title: 'Vu Theanh',
        text: 'Chuẩn quá',
        children: [
            {
                id: 1232,
                title: 'Nguyễn Trang',
                text: 'Mưa to quá mát ☺️☺️'
            }
        ]
    },
    {
        id: 123,
        title: 'Vu Theanh',
        text: 'Chuẩn qu a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a ',
        children: [
            {
                id: 1232,
                title: 'Nguyễn Trang',
                text: 'Mưa to quá mát ☺️☺️'
            }
        ]
    }
]