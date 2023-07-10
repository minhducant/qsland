import { Modal, Animated, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { BottomSheet, BottomSheetRef, BottomSheetProps } from 'react-native-sheet';

interface SheetProps extends BottomSheetProps {
  height?: number
  options?: {
    background?: string
    hideBackground?: boolean
  }
  styleBox?: StyleProp<ViewStyle>
  onClose?: any
  onOpen?: any
  children?: any
}
const Sheet = React.forwardRef(({ options, children, height, styleBox, onClose, onOpen, onCloseStart, onOpenFinish, ...rest }: SheetProps, ref) => {
  React.useImperativeHandle(ref, () => ({
    open: () => refSheet.current?.show(),
    close: () => refSheet.current?.hide(),
  }))
  const heightBox = height || 350
  const refSheet = useRef<BottomSheetRef>(null)
  return (
    <BottomSheet
      ref={refSheet} height={heightBox}
      sheetStyle={[{ backgroundColor: '#fff' }, styleBox]}
      backdropBackgroundColor={options?.hideBackground ? '#FFFFFF00' : options?.background}
      onOpenStart={onOpen}
      onOpenFinish={onOpenFinish}
      onCloseFinish={onClose}
      onCloseStart={onCloseStart}
    >
      {children}
    </BottomSheet>

  )
})
export default Sheet
