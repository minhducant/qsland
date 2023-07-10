import { Image, ImageProps, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewProps, ViewStyle } from 'react-native'
import React, { isValidElement } from 'react'
import { Block, IconC, Touch } from '@mylib';
import { arrayData } from '@utils/format';
import { Log } from '@utils';
export type ListImageProps = {
  data: { uri: string }[],
  onPressItem?: ({ item, index }: { item: any, index: number }) => any
  onRemoveItem?: ({ item, index }: { item: any, index: number }) => any
  styleImage?: ImageProps['style']
  styleScrollView?: ImageProps['style']
  styleContainer?: ViewProps['style']
  styleIcon?: {
    container?: StyleProp<ViewStyle> | StyleProp<TextStyle>
    icon?: StyleProp<TextStyle>
  }
  renderIcon?: () => React.ReactNode
  propsScrollView?: React.ComponentPropsWithoutRef<typeof ScrollView>
  hiddenClose?: boolean
}
export function ListImage({ data, hiddenClose, onPressItem, onRemoveItem, styleScrollView, styleImage, styleContainer, styleIcon, renderIcon, propsScrollView }: ListImageProps) {
  return (
    <ScrollView style={[styles.scrollView, styleScrollView]} horizontal showsHorizontalScrollIndicator={false} {...propsScrollView}>
      {arrayData(data).map((item, index) => (
        <Touch key={index} onPress={() => { Log.d('ListImage'); onPressItem && onPressItem({ item, index }) }} styleBox={[styles.container, styleContainer]}>
          <Image source={item} style={[styles.image, styleImage]} />
          {!isValidElement(renderIcon) && (
            <Touch hidden={hiddenClose} onPress={() => onRemoveItem && onRemoveItem({ item, index })} styleBox={[styles.containerIcon, styleIcon?.container]}>
              <IconC name="close" color='#fff' size={23} style={styleIcon?.icon} />
            </Touch>
          )}
          {isValidElement(renderIcon) && renderIcon()}
        </Touch>
      ))}
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  scrollView: { flexDirection: 'row' },
  image: {
    width: 100,
    height: 100
  },
  container: {
    overflow: 'hidden'
  },
  containerIcon: {
    width: 40, height: 40, borderRadius: 100, backgroundColor: 'gray',
    alignItems: 'center', justifyContent: 'center',
    position: 'absolute',
    right: 0
  }
})