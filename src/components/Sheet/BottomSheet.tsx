import { Modal, Animated, StyleProp, ViewStyle, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Block, Touch } from '@mylib'
import { LayoutApp, } from '@components'
import { BottomSheet, BottomSheetRef, BottomSheetProps } from 'react-native-sheet';
import { ForceInsetProp } from 'react-native-safe-area-view'
import { isNumber } from 'underscore';

interface SheetProps extends BottomSheetProps {
  height?: number | string
  children: any
  options?: {
    background?: string
    hideBackground?: boolean
  }
  styleBox?: StyleProp<ViewStyle>
  styleLayout?: StyleProp<ViewStyle>
  styleLayoutParent?: StyleProp<ViewStyle>
  onClose?: any
  onOpen?: any
  forceInset?: ForceInsetProp
  forceInsetBot?: ForceInsetProp
  scrollEnable?: BottomSheetProps['draggable']
  outClose?: boolean
}
const Sheet = React.forwardRef(({
  options,
  children,
  height,
  styleBox,
  onClose,
  onOpen,
  onCloseStart,
  onOpenFinish,
  forceInset,
  forceInsetBot,
  styleLayout,
  styleLayoutParent,
  scrollEnable,
  outClose = true,
  ...rest }:
  SheetProps, ref) => {
  React.useImperativeHandle(ref, () => ({
    open: () => refSheet.current?.show(),
    close: () => refSheet.current?.hide(),
  }))
  const _height = () => {
    if (typeof height == "string") {
      var percentageNumber = Dimensions.get('screen').height * parseFloat(height.slice(0, -1)) / 100;
      return percentageNumber
    }
    if (isNumber(height)) return height
    return Dimensions.get('screen').height * 0.5
  }
  const refSheet = useRef<BottomSheetRef>(null)
  return (
    <BottomSheet
      ref={refSheet} height={_height()}
      sheetStyle={[{ backgroundColor: '#fff' }, styleBox]}
      backdropBackgroundColor={options?.hideBackground ? '#FFFFFF00' : options?.background}
      onOpenStart={onOpen}
      onOpenFinish={onOpenFinish}
      onCloseFinish={onClose}
      onCloseStart={onCloseStart}
      openTime={500}
      closeTime={500}
      draggable={scrollEnable}
      backdropClosesSheet={outClose}
      {...rest}
    >
      <LayoutApp
        forceInset={{ vertical: 'never', ...forceInset }}
        forceInsetBot={{ vertical: 'never', ...forceInsetBot }}
        styleBot={[{ backgroundColor: '#fff', }, styleLayout]}
        style={styleLayoutParent}
      >
        {children}
      </LayoutApp>
    </BottomSheet>

  )
})
export default Sheet
