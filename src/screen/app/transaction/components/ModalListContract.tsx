import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BottomSheet } from '@components/Sheet'
import { Block, IconC, Touch } from '@mylib/UIKit'
import { TextApp } from '@components'
import { AppLang } from '@assets/langs'
import ButtonApp from '@components/ButtonApp'
import { AppColor } from '@assets/colors'
import { ScrollView } from 'react-native'
import ActionSheetIos from '@components/Sheet/ActionSheetIos'
import { useListCategories } from '@service/hook'
import { isEmpty } from 'underscore'
import { Log } from '@utils/Log'
import { Map, Record, is } from 'immutable'
import { TINH_TRANG_HOP_DONG } from '@service/constant/constant'

const initOptions = {
    status: { name: '', value: null },
}
export const activeFilter = (params: any) => {
    const { status } = params
    if (
        status
    )
        return true;
    return false;
};
export const ModalListContract = React.forwardRef<any, any>(
    ({ onSelected, onRemove }, ref) => {
        React.useImperativeHandle(ref, () => ({ ...refRef.current }))
        const [options, setOptions] = useState<any>({ ...initOptions })
        const refRef = useRef<any>(null)
        const statusData = Object.values(TINH_TRANG_HOP_DONG)
        const statusRef = useRef<any>(null)

        const onSave = () => {
            onSelected({
                status: options.status.value,
            })
            refRef.current?.close()
        }
        const onCancel = () => {
            setOptions({ ...initOptions })
            onSelected &&
                onSelected({
                    status: null,
                })

            refRef.current?.close()
        }
        const [category, setCategory] = useState(Map<string, object>({}))
        const Press = async (item: any) => {
            const { id, name } = item
            if (category.has(`${item.id}`))
                await setCategory(category.delete(`${item.id}`))
            else {
                await setCategory(category.set(`${item.id}`, { id, name }))
            }
        }
        const Active = (item: any) => {
            return category.has(`${item.id}`)
        }
        const funcPropsIcon = (item: any) => {
            const active = Active(item)
            return {
                color: AppColor('primary'),
                size: 23,
                name: active ? 'checkmark-circle' : 'none', //'radio-button-off-outline'
            }
        }
        function onCategory() {
            let _category = Object.values(category.toJS()).map(({ id }) => id)
            if (category.size > 0) {
                let _name =
                    category.size > 1
                        ? `${category.size} trạng thái đã chọn`
                        : category.first()?.name
                setOptions(prev => ({
                    ...prev,
                    status: { value: JSON.stringify(_category), name: _name },
                }))
            } else {
                setOptions(prev => ({
                    ...prev,
                    status: { value: null, name: null },
                }))
            }
            statusRef.current?.close()
        }
        // Log.d('23e', category)
        return (
            <BottomSheet
                ref={refRef}
                draggable={false}
                height={'75%'}
                forceInsetBot={{ bottom: 'always' }}
                styleLayout={{ paddingBottom: 10 }}>
                <Block pad10 padV={15} borderBW={1} borderC='#ddd' mid>
                    <TextApp size18 bold center>
                        {AppLang('loc_hop_dong')}
                    </TextApp>
                    <IconC
                        name='close-outline'
                        style={{ position: 'absolute', right: 10 }}
                        onPress={() => {
                            refRef.current?.close()
                        }}
                    />
                </Block>
                <ScrollView>
                    <Block pad10>
                        <ItemOption
                            value={options.status.name}
                            title={AppLang('trang_thai')}
                            onPress={() => statusRef.current?.open()}
                        />
                    </Block>
                </ScrollView>
                <Block row justifyContent='flex-end' padH20 marT10>
                    <ButtonApp
                        onPress={onCancel}
                        title={AppLang('bo_qua')}
                        style={{ marginRight: 10, width: '30%' }}
                        background={AppColor('bg_gray')}
                    />
                    <ButtonApp
                        onPress={onSave}
                        title={AppLang('xac_nhan')}
                        style={{ width: '30%' }}
                    />
                </Block>
                <ActionSheetIos
                    // onRefresh={statusData.onRefresh}
                    onPressButton={Press}
                    options={statusData}
                    ref={statusRef}
                    onCancel={onCategory}
                    textCancel={AppLang('dong_y')}
                    iconProps={{ show: true, funcProps: funcPropsIcon }}
                    autoClose={false}
                />
            </BottomSheet>
        )
    },
)

export const ItemOption = ({ title, value, onPress }: any) => (
    <Block marT10>
        <Block>
            <TextApp bold>{title}</TextApp>
        </Block>
        <Touch
            onPress={onPress}
            minH={45}
            bg='#eee'
            pad5
            marT10
            borderR={5}
            row
            centerH
            padH10>
            {!isEmpty(value) && (
                <TextApp bold color={AppColor('primary')}>
                    {value}
                </TextApp>
            )}
            {isEmpty(value) && <TextApp color='gray'>{AppLang('chon')}</TextApp>}
            <IconC name='chevron-down-outline' />
        </Touch>
    </Block>
)
export const ItemOptionDate = ({
    title,
    value1,
    value2,
    onPress1,
    onPress2,
}: any) => (
    <Block marT10>
        <Block>
            <TextApp bold>{title}</TextApp>
        </Block>
        <Block minH={45} marT10 row centerH>
            <Touch
                onPress={onPress1}
                flex1
                centerH
                row
                bg='#eee'
                h100
                padH10
                borderR={5}>
                <TextApp>{AppLang('tu')}</TextApp>
                <TextApp bold color={AppColor('primary')}>
                    {value1}
                </TextApp>
                <IconC name='calendar-outline' />
            </Touch>
            <Block w={10} />
            <Touch
                onPress={onPress2}
                flex1
                centerH
                row
                bg='#eee'
                h100
                padH10
                borderR={5}>
                <TextApp>{AppLang('den')}</TextApp>
                <TextApp bold color={AppColor('primary')}>
                    {value2}
                </TextApp>
                <IconC name='calendar-outline' />
            </Touch>
        </Block>
    </Block>
)
