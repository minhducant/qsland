import { ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { Block, Touch } from '@mylib'
import RBSheet from 'react-native-raw-bottom-sheet'
import { LayoutApp } from '@components'
import RowSheet from './RowSheet'
import { arrayData } from '@utils/format'
import { AppLang } from '@assets/langs'
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
export const SheetBottom = React.forwardRef(
  ({ data, onPressItem, options }: SheetBottomProps, ref) => {
    React.useImperativeHandle(ref, () => ({
      open: () => ref_RBSheet.current.open(),
      close: () => ref_RBSheet.current.close(),
    }))
    const heightSheet = options?.heightBox ? options?.heightBox + 120 : 400
    const heightBox = options?.heightBox || 280

    const ref_RBSheet = useRef<any>()
    return (
      <RBSheet
        ref={ref_RBSheet}
        closeOnDragDown
        closeOnPressMask
        height={heightSheet}
        customStyles={{
          wrapper: {
            backgroundColor: '#0F101393',
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
          container: {
            borderRadius: 10,

            backgroundColor: 'transparent',
            // backgroundColor: 'red',
          },
        }}
        openDuration={300}
        {...RBSheetProps}>
        <LayoutApp
          forceInset={{ vertical: 'never' }}
          forceInsetBot={{ vertical: 'never', bottom: 'always' }}
          styleBot={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}>
          <Touch
            flex1
            pad10
            justifyC='flex-end'
            activeOpacity={1}
            onPress={() => ref_RBSheet.current.close()}>
            <Block maxHeight={heightBox} borderR={20} overH bgW>
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
                onPress={() => ref_RBSheet.current.close()}
                styleBox={{
                  backgroundColor: 'white',
                }}
              />
            </Block>
          </Touch>
        </LayoutApp>
      </RBSheet>
    )
  },
)

const RBSheetProps: any = {}
