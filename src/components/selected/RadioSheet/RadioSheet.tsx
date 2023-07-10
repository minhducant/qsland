import { ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { Block, Touch } from '@mylib'
import RBSheet from 'react-native-raw-bottom-sheet'
import { LayoutApp } from '@components'
import RowSheet from './RowSheet'
import { arrayData } from '@utils/format'
import { AppLang } from '@assets/langs'
type P = {
  data: any[]
  onPressItem: (item: any) => void
  selected: any[]
  option?: { title: string }
}
export const RadioSheet = React.forwardRef(
  ({ data, selected, onPressItem, option }: P, ref) => {
    React.useImperativeHandle(ref, () => ({
      open: () => ref_RBSheet.current.open(),
      close: () => ref_RBSheet.current.close(),
    }))
    const ref_RBSheet = useRef<any>()
    return (
      <RBSheet
        ref={ref_RBSheet}
        closeOnDragDown
        closeOnPressMask
        height={400}
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
            <Block maxHeight={280} borderR={20} overH bgW>
              <ScrollView>
                {arrayData(data).map((item, index) => (
                  <RowSheet
                    key={index}
                    onPress={() => onPressItem && onPressItem(item)}
                    content={item?.name}
                    icon={item?.icon}
                    styleBox={{}}
                    status={selected.find(i => i?.value == item?.value)}
                  />
                ))}
              </ScrollView>
            </Block>
            <Block
              styleBox={{
                marginTop: 10,
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: '#fff',
              }}>
              <RowSheet
                content={option?.title ? option?.title : AppLang('huy')}
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
