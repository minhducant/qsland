import { ScrollView } from 'react-native'
import { IconC, Touch, Block } from '@mylib'
import { TextApp } from '@components'
import { AppColor } from '@assets/colors'
import React, { useState, useImperativeHandle } from 'react'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { useRef } from 'react'
import RowSheet from './RowSheet'
import RBSheet from 'react-native-raw-bottom-sheet'
import { LayoutApp } from '@components'
import { arrayData } from '@utils/format'
import { AppLang } from '@assets/langs'
const FormInput = React.forwardRef((props: any, ref) => {
  useImperativeHandle(ref, () => ({
    getValue() {
      return value
    },
  }))
  const onClickItem = (item: any) => {
    setValue(item)
    ref_RBSheet.current.close()
  }
  const _renderTitle = () => {
    if (value) return value?.title
    return props?.title
  }
  const [value, setValue] = useState<any>(
    props.valueInit ? props.valueInit : {},
  )
  const ref_RBSheet = useRef<any>()
  return (
    <Block flex1>
      <Header
        title={value?.title ? _renderTitle() : props?.title}
        onPress={() => {
          console.log('onPress-floor')
          ref_RBSheet.current.open()
        }}
      />
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
            <Block borderR={20} overH bgW>
              <ScrollView>
                {arrayData(props?.data).map((item, index) => (
                  <RowSheet
                    key={index}
                    onPress={() => onClickItem(item)}
                    content={item?.title}
                    styleBox={{}}
                  />
                ))}
              </ScrollView>
            </Block>
            <Block
              bgW
              styleBox={{
                marginTop: 10,
                borderRadius: 15,
                overflow: 'hidden',
              }}>
              <RowSheet
                content={AppLang('huy')}
                onPress={() => ref_RBSheet.current.close()}
                styleBox={{
                  backgroundColor: 'white',
                }}
              />
            </Block>
          </Touch>
        </LayoutApp>
      </RBSheet>
    </Block>
  )
})
export default FormInput
FormInput.defaultProps = {}
const RBSheetProps: any = {}
const Header = ({ title, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
      }}>
      <TextApp
        color={AppColor('txt_black')}
        style={{ paddingHorizontal: 0, fontSize: 16 }}>
        {title}
      </TextApp>
      <IconC
        size={20}
        color={AppColor('txt_gray')}
        name='chevron-down-outline'
      />
    </TouchableOpacity>
  )
}
