import React from 'react'
import { Block } from '@mylib'
import ScreenApp from '@components/layout/ScreenApp'
import { AppLang } from '@assets/langs'
import { FlatList } from 'react-native'
import { createArray2 } from '@utils/array';
import { ItemCampaign } from '../components'
import { navigate } from '@navigation/rootNavigation'
import { useListCampaignProject } from '@service/hook'
import { ToastAppSuccess } from '@components/Toast'

export default function ScreenListCampaign({ route }: any) {
    const { id } = route.params
    const { data, onRefresh, loading } = useListCampaignProject<any>(id)

    return (
        <ScreenApp back title={AppLang('danh_sach_chien_dich')}>
            <Block flex1 bg={'#eee'}>
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={loading}
                    contentContainerStyle={{ flex: 1, padding: 10, backgroundColor: '#eee' }}
                    data={data}
                    renderItem={({ item }) => <ItemCampaign item={item}
                        onPress={() => {
                            // vacant_position
                            if (item?.vacant_position == 0) return ToastAppSuccess('Đã hết chỗ')
                            navigate('ScreenCampaignDetail', { id: item?.id })
                        }}

                    />}
                    ItemSeparatorComponent={() => <Block h={10} />}
                />
            </Block>
        </ScreenApp>
    )
}
