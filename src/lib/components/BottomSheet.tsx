import { Modal, Animated, StyleProp, ViewStyle, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BottomSheet as RNBottomSheet, BottomSheetRef, BottomSheetProps } from 'react-native-sheet';
import { styles } from 'react-native-sheet/src/features/BottomSheet/styles';
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
  draggable?: boolean
}
const BottomSheet = React.forwardRef(({ options, children, height, styleBox, onClose, onOpen, onCloseStart, onOpenFinish, ...rest }: SheetProps, ref) => {
  React.useImperativeHandle(ref, () => ({
    open: () => refSheet.current?.show(),
    close: () => refSheet.current?.hide(),
  }))
  const heightBox = height || 350
  const refSheet = useRef<BottomSheetRef>(null)
  return (
    <RNBottomSheet
      ref={refSheet} height={heightBox}
      sheetStyle={[{ backgroundColor: '#fff' }, styleBox]}
      backdropBackgroundColor={options?.hideBackground ? '#FFFFFF00' : options?.background}
      onOpenStart={onOpen}
      onOpenFinish={onOpenFinish}
      onCloseFinish={onClose}
      onCloseStart={onCloseStart}
      draggable={rest.draggable}
    >
      {rest.draggable && <DragIcon />}
      {children}
    </RNBottomSheet>

  )
})
export default BottomSheet
const DragIcon = ({ dragIconColor, dragIconStyle, isDarkMode }: any) =>
  <View style={styles.draggableContainer}>
    <View
      testID='drag-icon'
      style={[
        styles.draggableIcon,
        dragIconStyle,
        {
          backgroundColor: dragIconColor || isDarkMode ? '#444444' : '#A3A3A3'
        }
      ]}
    />
  </View>

