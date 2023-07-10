import { ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { Block, Touch } from '@mylib'
import RBSheet from 'react-native-raw-bottom-sheet'
import { LayoutApp } from '@components'
import RowSheet from './RowSheet'
import { arrayData } from '@utils/format'
import { AppLang } from '@assets/langs'
import { BottomSheet } from '@components/Sheet'
type SheetBottomProps = {
  data: { name: string }[]
  onPressItem: (item: any) => void
  options?: {
    hideButton?: boolean
    hideLabel?: string
    heightSheet?: number
    heightBox?: number
  }
}
export const SheetBottom2 = React.forwardRef(
  ({ data, onPressItem, options }: SheetBottomProps, ref) => {
    React.useImperativeHandle(ref, () => ({
      ..._BottomSheet.current
    }))
    const _BottomSheet = useRef<any>()
    const height = options?.heightBox || 280
    return (
      <BottomSheet ref={_BottomSheet} height={height}>
        <Block maxHeight={height} borderR={20} overH bgW>
          <ScrollView>
            {arrayData(data).map((item, index) => (
              <RowSheet
                key={index}
                onPress={() => onPressItem && onPressItem(item)}
                content={item?.name}
                icon={item?.icon}
                styleBox={{}}
              />
            ))}
          </ScrollView>
        </Block>
        <Block
          hidden={options?.hideButton}
          bgW
          styleBox={{
            marginTop: 10,
            borderRadius: 15,
            overflow: 'hidden',
          }}>
          <RowSheet
            content={
              options?.hideLabel ? options.hideLabel : AppLang('huy')
            }
            onPress={() => _BottomSheet.current.close()}
            styleBox={{
              backgroundColor: 'white',
            }}
          />
        </Block>
      </BottomSheet>
    )
  },
)

