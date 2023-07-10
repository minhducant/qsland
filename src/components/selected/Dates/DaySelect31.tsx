import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BottomSheet } from '@components/Sheet'
import { Block, IconC, Touch } from '@mylib';
import { TextApp } from '@components';
import { AppLang } from '@assets/langs';
import { columnData } from '@utils/array';
import { screen_width } from '@components/index';
import { AppColor } from '@assets/colors';

const DaySelect31 = React.forwardRef(({ height, isActive, onPress, btnSave = false, onRight, ...rest }: any, ref) => {
  const _Date = useRef<any>()
  React.useImperativeHandle(ref, () => ({
    ..._Date.current
  }))
  return (
    <BottomSheet ref={_Date} height={500} {...rest}>
      <Block flex1 bgW>
        <ScrollView>
          <Block padV20 mid borderBW={1} borderC='#ddd'>
            <TextApp center bold>
              {AppLang('chon_ngay')}
            </TextApp>
            <Touch mid styleBox={{ position: 'absolute', right: 15 }} onPress={() => _Date.current.close()}>
              <IconC name="close" size={23} />
            </Touch>
          </Block>
          <Block pad10 padT={20}>
            {columnData([...Array(31).keys()], 7).map(
              (children, key_parent) => (
                <Block row key={key_parent}>
                  {children.map((item, key) => (
                    <Touch
                      onPress={() => onPress && onPress(item + 1)}
                      borderC={isActive ? (isActive(item + 1) ? AppColor('primary') : "#ddd") : '#ddd'}
                      mid
                      bg="#eee"
                      borderW={1}
                      borderR100
                      marB={2}
                      marR={2}
                      square={(screen_width - 20 - 2 * 7) / 7}
                      {...{ key }}
                    >
                      <TextApp bold>{item + 1}</TextApp>
                    </Touch>
                  ))}
                </Block>
              ),
            )}
          </Block>
          {/* <BottomSave
            hidden={!btnSave}
            marginTop={20}
            text2={AppLang('ap_dung')}
            onLeft={() => _Date.current.close()}
            onRight={() => {
              onRight & onRight()
            }}
          /> */}
        </ScrollView>
      </Block>
    </BottomSheet>
  )
})
export default DaySelect31
const styles = StyleSheet.create({})